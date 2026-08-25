"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import {
  ACTIONS,
  COLORS,
  FILE_NAME,
  STAGES,
  TONE_STYLES,
  type ActionKey,
  type StageKey,
  type Tone,
} from "@/constants/git-config";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type SimFile = {
  name: string;
  version: number;
};

type Commit = {
  id: string;
  hash: string;
  message: string;
};

type LogLine = {
  id: string;
  command: string;
  status: "ok" | "error";
  detail: string;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function randomHash() {
  return Math.random().toString(16).slice(2, 9);
}

function makeLog(command: string, status: "ok" | "error", detail: string): LogLine {
  return { id: `${Date.now()}-${Math.random()}`, command, status, detail };
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function GitWorkflowSimulator() {
  const [workingFile, setWorkingFile] = useState<SimFile | null>(null);
  const [stagingFile, setStagingFile] = useState<SimFile | null>(null);
  const [localCommits, setLocalCommits] = useState<Commit[]>([]);
  const [githubCommits, setGithubCommits] = useState<Commit[]>([]);
  const [logs, setLogs] = useState<LogLine[]>([
    makeLog("", "ok", "Selamat datang di Git Workflow Simulator!"),
    makeLog("", "ok", "Silahkan klik tombol di atas untuk memulai alur kerja."),
  ]);
  const [shakeStage, setShakeStage] = useState<StageKey | null>(null);
  const [flashStage, setFlashStage] = useState<StageKey | null>(null);
  const [pulseAction, setPulseAction] = useState<ActionKey | null>(null);

  const editCountRef = useRef(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const pushLog = useCallback((command: string, status: "ok" | "error", detail: string) => {
    setLogs((prev) => [...prev.slice(-30), makeLog(command, status, detail)]);
  }, []);

  const triggerShake = useCallback((stage: StageKey) => {
    setShakeStage(stage);
    window.setTimeout(() => setShakeStage(null), 420);
  }, []);

  const triggerFlash = useCallback((stage: StageKey) => {
    setFlashStage(stage);
    window.setTimeout(() => setFlashStage(null), 500);
  }, []);

  const triggerPulse = useCallback((action: ActionKey) => {
    setPulseAction(action);
    window.setTimeout(() => setPulseAction(null), 350);
  }, []);

  /* ---- Aksi: Edit File ---- */
  const handleEditFile = useCallback(() => {
    editCountRef.current += 1;
    const version = editCountRef.current;
    setWorkingFile({ name: FILE_NAME, version });
    triggerPulse("edit");
    triggerFlash("working");
    pushLog(`edit ${FILE_NAME}`, "ok", `File "${FILE_NAME}" diperbarui di working directory.`);
  }, [pushLog, triggerFlash, triggerPulse]);

  /* ---- Aksi: git add ---- */
  const handleGitAdd = useCallback(() => {
    triggerPulse("add");
    if (!workingFile) {
      triggerShake("working");
      pushLog("git add .", "error", 'Belum ada perubahan. Klik "Edit File" terlebih dahulu.');
      return;
    }
    setStagingFile(workingFile);
    setWorkingFile(null);
    triggerFlash("staging");
    pushLog("git add .", "ok", `"${workingFile.name}" ditambahkan ke staging area.`);
  }, [workingFile, pushLog, triggerShake, triggerFlash, triggerPulse]);

  /* ---- Aksi: git commit ---- */
  const handleGitCommit = useCallback(() => {
    triggerPulse("commit");
    if (!stagingFile) {
      triggerShake("staging");
      pushLog('git commit -m "..."', "error", 'Belum ada file di staging. Jalankan "git add" terlebih dahulu.');
      return;
    }
    const commit: Commit = {
      id: `${Date.now()}`,
      hash: randomHash(),
      message: `Update ${stagingFile.name} (v${stagingFile.version})`,
    };
    setLocalCommits((prev) => [...prev, commit]);
    setStagingFile(null);
    triggerFlash("local");
    pushLog(`git commit -m "${commit.message}"`, "ok", `Commit ${commit.hash} dibuat di local repository.`);
  }, [stagingFile, pushLog, triggerShake, triggerFlash, triggerPulse]);

  /* ---- Aksi: git push ---- */
  const handleGitPush = useCallback(() => {
    triggerPulse("push");
    if (localCommits.length === 0) {
      triggerShake("local");
      pushLog("git push", "error", 'Tidak ada commit untuk di-push. Jalankan "git commit" terlebih dahulu.');
      return;
    }
    const count = localCommits.length;
    setGithubCommits((prev) => [...prev, ...localCommits]);
    setLocalCommits([]);
    triggerFlash("github");
    pushLog("git push origin main", "ok", `${count} commit berhasil di-push ke GitHub.`);
  }, [localCommits, pushLog, triggerShake, triggerFlash, triggerPulse]);

  const handleReset = useCallback(() => {
    setWorkingFile(null);
    setStagingFile(null);
    setLocalCommits([]);
    setGithubCommits([]);
    editCountRef.current = 0;
    pushLog("", "ok", "Simulator direset.");
  }, [pushLog]);

  const handleAction: Record<ActionKey, () => void> = {
    edit: handleEditFile,
    add: handleGitAdd,
    commit: handleGitCommit,
    push: handleGitPush,
  };

  const stageHasContent: Record<StageKey, boolean> = {
    working: !!workingFile,
    staging: !!stagingFile,
    local: localCommits.length > 0,
    github: githubCommits.length > 0,
  };

  function renderStageContent(key: StageKey) {
    switch (key) {
      case "working":
        return workingFile ? (
          <FileBadge key={workingFile.version} label={workingFile.name} sub={`v${workingFile.version} · belum di-stage`} tone="amber" />
        ) : null;
      case "staging":
        return stagingFile ? (
          <FileBadge key={stagingFile.version} label={stagingFile.name} sub="siap di-commit" tone="blue" />
        ) : null;
      case "local":
        return (
          <div className="flex w-full flex-col gap-1.5">
            {localCommits.map((c) => (
              <CommitBadge key={c.id} commit={c} tone="violet" />
            ))}
          </div>
        );
      case "github":
        return (
          <div className="flex w-full flex-col gap-1.5">
            {githubCommits.map((c) => (
              <CommitBadge key={c.id} commit={c} tone="emerald" />
            ))}
          </div>
        );
    }
  }

  const stageEmptyText: Record<StageKey, string> = {
    working: "Belum ada perubahan",
    staging: "Staging area kosong",
    local: "Belum ada commit",
    github: "Belum ada yang ter-push",
  };

  return (
    <div
      className="mx-auto w-full overflow-x-hidden rounded-[20px] border-[6px] border-[#0a1330] p-4 shadow-[0_25px_60px_-15px_rgba(10,19,48,0.55)] sm:rounded-[24px] sm:p-6 lg:rounded-[28px] lg:p-7"
      style={{ backgroundColor: COLORS.cardBg }}
    >
      <style>{`
        @keyframes gws-fade-slide-in {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gws-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes gws-flash-ring {
          0% { box-shadow: 0 0 0 0 rgba(96,165,250,0.6); }
          100% { box-shadow: 0 0 0 10px rgba(96,165,250,0); }
        }
        .gws-item-enter { animation: gws-fade-slide-in 0.35s ease both; }
        .gws-shake { animation: gws-shake 0.4s ease; }
        .gws-flash { animation: gws-flash-ring 0.5s ease; }
      `}</style>

      {/* ---- Header ---- */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
        <div className="min-w-0">
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white sm:text-xs cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* ---- 4 kotak stage ---- */}
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.key}
              className={[
                "flex min-h-[130px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl p-3 text-center transition-shadow sm:min-h-[155px] sm:gap-2.5 lg:min-h-[165px]",
                shakeStage === stage.key ? "gws-shake ring-2 ring-red-500/70" : "",
                flashStage === stage.key ? "gws-flash" : "",
              ].join(" ")}
              style={{
                background: `linear-gradient(to bottom, ${COLORS.boxGradientFrom}, ${COLORS.boxGradientTo})`,
                border: `1px solid ${COLORS.boxBorder}`,
              }}
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: COLORS.boxTitle }} strokeWidth={1.7} />
              <div>
                <p className="text-sm font-semibold sm:text-base" style={{ color: COLORS.boxTitle }}>
                  {stage.title}
                </p>
                <p className="text-xs sm:text-sm" style={{ color: COLORS.boxSubtitle }}>
                  {stage.subtitle}
                </p>
              </div>
              <div className="flex min-h-[32px] w-full flex-1 flex-col items-center justify-center gap-1.5 pt-1 sm:min-h-[36px]">
                {stageHasContent[stage.key] ? (
                  renderStageContent(stage.key)
                ) : (
                  <span className="text-[11px] italic sm:text-xs" style={{ color: COLORS.boxSubtitle }}>
                    {stageEmptyText[stage.key]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Tombol aksi ---- */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              type="button"
              onClick={handleAction[action.key]}
              className={[
                "flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all active:scale-95 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs lg:text-sm cursor-pointer",
                pulseAction === action.key ? "ring-4 ring-blue-400/40" : "",
              ].join(" ")}
              style={{ backgroundColor: COLORS.buttonBg, color: COLORS.buttonText }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.buttonBgHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.buttonBg)}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---- Terminal ---- */}
      <div className="mt-4 overflow-hidden rounded-xl sm:mt-5" style={{ backgroundColor: COLORS.terminalBg }}>
        <div
          className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2"
          style={{ backgroundColor: COLORS.terminalBarBg }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[10px] text-white/30">terminal</span>
        </div>
        <div ref={terminalRef} className="max-h-32 overflow-y-auto overflow-x-hidden px-3 py-2.5 font-mono text-[11px] leading-relaxed sm:max-h-40 sm:text-[12px]">
          {logs.map((log) => (
            <div key={log.id} className="gws-item-enter">
              {log.command ? (
                <p style={{ color: COLORS.terminalPrompt }}>
                  <span className="opacity-50">$ </span>
                  {log.command}
                </p>
              ) : null}
              <p style={{ color: log.status === "error" ? COLORS.terminalError : COLORS.terminalText }}>
                {log.command ? (log.status === "error" ? "✗ " : "✔ ") : "$ "}
                {log.command ? log.detail : `[${log.detail}]`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function FileBadge({ label, sub, tone }: { label: string; sub: string; tone: Tone }) {
  return (
    <div className={`gws-item-enter w-full rounded-lg border px-2 py-1.5 ${TONE_STYLES[tone]}`}>
      <p className="truncate text-[11px] font-semibold">{label}</p>
      <p className="truncate text-[9px] opacity-80">{sub}</p>
    </div>
  );
}

function CommitBadge({ commit, tone }: { commit: Commit; tone: Tone }) {
  return (
    <div className={`gws-item-enter w-full rounded-lg border px-2 py-1.5 ${TONE_STYLES[tone]}`}>
      <p className="truncate text-[11px] font-semibold">● {commit.hash}</p>
      <p className="truncate text-[9px] opacity-80">{commit.message}</p>
    </div>
  );
}