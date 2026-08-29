"use client";
"use no memo";
/* eslint-disable react-hooks/immutability */

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AUDIO_PATHS,
  BACKGROUND_IMAGE_PATH,
  GAME_CONFIG,
  JUMP_FRAME_PATH,
  OBSTACLE_STYLES,
  RUN_FRAME_PATHS,
  type ObstacleType,
} from "@/constants/game-config";

type GamePhase = "loading" | "idle" | "running" | "gameover";

type Obstacle = {
  type: ObstacleType;
  x: number;
  y: number;
  width: number;
  height: number;
  passed: boolean;
};

type Character = {
  y: number;
  velocityY: number;
  isJumping: boolean;
  frameIndex: number;
  frameTimer: number;
};

type GameState = {
  character: Character;
  obstacles: Obstacle[];
  bgOffset: number;
  speed: number;
  distance: number;
  score: number;
  nextObstacleTimer: number;
  lastTimestamp: number;
  groundY: number;
  canvasWidth: number;
  canvasHeight: number;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal memuat gambar: ${src}`));
    img.src = src;
  });
}

// Ukuran karakter menyesuaikan lebar canvas: lebih kecil di layar sempit (mobile).
function getCharacterHeight(canvasWidth: number): number {
  return canvasWidth > 0 && canvasWidth < GAME_CONFIG.mobileBreakpoint
    ? GAME_CONFIG.characterSizeMobile
    : GAME_CONFIG.characterSize;
}

// Clone node biar sfx yang overlap (mis. lompat 2x cepat) nggak saling motong.
function playSfx(base: HTMLAudioElement | undefined, muted: boolean) {
  if (!base || muted) return;
  const instance = base.cloneNode(true) as HTMLAudioElement;
  instance.volume = base.volume;
  instance.play().catch(() => {
    // browser mungkin nge-block autoplay sebelum ada interaksi user — aman diabaikan
  });
}

function createInitialState(): GameState {
  return {
    character: { y: 0, velocityY: 0, isJumping: false, frameIndex: 0, frameTimer: 0 },
    obstacles: [],
    bgOffset: 0,
    speed: GAME_CONFIG.baseSpeed,
    distance: 0,
    score: 0,
    nextObstacleTimer: 700,
    lastTimestamp: 0,
    groundY: 0,
    canvasWidth: 0,
    canvasHeight: GAME_CONFIG.canvasHeight,
  };
}

export function EndlessRunnerGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const assetsRef = useRef<{
    runFrames: HTMLImageElement[];
    jumpFrame: HTMLImageElement | null;
    background: HTMLImageElement;
  } | null>(null);

  const stateRef = useRef<GameState>(createInitialState());

  const audioRef = useRef<{
    bgm: HTMLAudioElement;
    jump: HTMLAudioElement;
    coin: HTMLAudioElement;
    hit: HTMLAudioElement;
    gameOver: HTMLAudioElement;
  } | null>(null);

  const [phase, setPhase] = useState<GamePhase>("loading");
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const phaseRef = useRef<GamePhase>("loading");
  const highScoreRef = useRef(0);
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioRef.current) {
      audioRef.current.bgm.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  // ---- Preload semua asset (frame sprite + background) ----
  useEffect(() => {
    let cancelled = false;

    async function preload() {
      try {
        const [runFrames, background, jumpFrame] = await Promise.all([
          Promise.all(RUN_FRAME_PATHS.map(loadImage)),
          loadImage(BACKGROUND_IMAGE_PATH),
          JUMP_FRAME_PATH ? loadImage(JUMP_FRAME_PATH) : Promise.resolve(null),
        ]);

        if (cancelled) return;
        assetsRef.current = { runFrames, background, jumpFrame };

        // Audio bersifat opsional: kalau file belum ada / gagal load, game tetap jalan tanpa suara.
        const bgm = new Audio(AUDIO_PATHS.bgm);
        bgm.loop = true;
        bgm.volume = GAME_CONFIG.bgmVolume;
        bgm.preload = "auto";

        const jumpSfx = new Audio(AUDIO_PATHS.jump);
        jumpSfx.volume = GAME_CONFIG.sfxVolume;
        jumpSfx.preload = "auto";

        const coinSfx = new Audio(AUDIO_PATHS.coin);
        coinSfx.volume = GAME_CONFIG.sfxVolume;
        coinSfx.preload = "auto";

        const hitSfx = new Audio(AUDIO_PATHS.hit);
        hitSfx.volume = GAME_CONFIG.sfxVolume;
        hitSfx.preload = "auto";

        const gameOverSfx = new Audio(AUDIO_PATHS.gameOver);
        gameOverSfx.volume = GAME_CONFIG.sfxVolume;
        gameOverSfx.preload = "auto";

        audioRef.current = { bgm, jump: jumpSfx, coin: coinSfx, hit: hitSfx, gameOver: gameOverSfx };

        try {
          const stored = Number(localStorage.getItem(GAME_CONFIG.highScoreStorageKey) ?? 0);
          setHighScore(Number.isFinite(stored) ? stored : 0);
        } catch {
          // localStorage tidak tersedia (mis. SSR/private mode) — abaikan saja
        }

        setPhase("idle");
      } catch (error) {
        console.error("[EndlessRunnerGame] gagal memuat aset:", error);
      }
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Resize canvas mengikuti lebar container ----
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    function resize() {
      const width = container!.clientWidth;
      const height = GAME_CONFIG.canvasHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      const ctx = canvas!.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      stateRef.current.canvasWidth = width;
      stateRef.current.canvasHeight = height;
      stateRef.current.groundY = height - height * GAME_CONFIG.groundHeightRatio;
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function spawnObstacle() {
    const s = stateRef.current;
    const roll = Math.random();
    const type: ObstacleType = roll < 0.18 ? "coin" : roll < 0.55 ? "warning" : "crate";

    if (type === "coin") {
      const size = 42;
      s.obstacles.push({
        type,
        x: s.canvasWidth + size,
        y: s.groundY - 90 - Math.random() * 40,
        width: size,
        height: size,
        passed: false,
      });
      return;
    }

    const style = OBSTACLE_STYLES[type];
    s.obstacles.push({
      type,
      x: s.canvasWidth + style.width,
      y: s.groundY - style.height,
      width: style.width,
      height: style.height,
      passed: false,
    });
  }

  function endGame() {
    const s = stateRef.current;
    const finalScoreValue = Math.floor(s.score);
    setFinalScore(finalScoreValue);

    if (audioRef.current) {
      audioRef.current.bgm.pause();
      audioRef.current.bgm.currentTime = 0;
      playSfx(audioRef.current.gameOver, isMutedRef.current);
    }

    if (finalScoreValue > highScoreRef.current) {
      highScoreRef.current = finalScoreValue;
      setHighScore(finalScoreValue);
      try {
        localStorage.setItem(GAME_CONFIG.highScoreStorageKey, String(finalScoreValue));
      } catch {
        // abaikan kalau localStorage tidak tersedia
      }
    }

    setPhase("gameover");
  }

  function update(dt: number) {
    const s = stateRef.current;
    const assets = assetsRef.current;
    if (!assets) return;
    const cfg = GAME_CONFIG;

    s.speed = Math.min(cfg.maxSpeed, s.speed + cfg.speedIncreasePerSecond * (dt / 1000));

    // parallax background looping
    const bgWidth = assets.background.width * (s.canvasHeight / assets.background.height);
    s.bgOffset -= s.speed;
    if (s.bgOffset <= -bgWidth) s.bgOffset += bgWidth;

    // fisika karakter
    const c = s.character;
    c.velocityY += cfg.gravity;
    c.y += c.velocityY;
    if (c.y >= 0) {
      c.y = 0;
      c.velocityY = 0;
      c.isJumping = false;
    }

    // animasi lari, hanya jalan kalau lagi di tanah
    if (!c.isJumping) {
      c.frameTimer += dt;
      if (c.frameTimer >= cfg.frameDurationMs) {
        c.frameTimer = 0;
        c.frameIndex = (c.frameIndex + 1) % assets.runFrames.length;
      }
    }

    // spawn rintangan baru
    s.nextObstacleTimer -= dt;
    if (s.nextObstacleTimer <= 0) {
      spawnObstacle();
      s.nextObstacleTimer =
        cfg.obstacleMinGapMs + Math.random() * (cfg.obstacleMaxGapMs - cfg.obstacleMinGapMs);
    }

    // bounding box karakter (sedikit lebih kecil dari sprite biar fair)
    const characterX = 70;
    const characterHeight = getCharacterHeight(s.canvasWidth);
    const characterWidth = characterHeight * 0.72;
    const characterBox = {
      x: characterX + characterWidth * 0.18,
      y: s.groundY - characterHeight + c.y + characterHeight * 0.08,
      width: characterWidth * 0.64,
      height: characterHeight * 0.86,
    };

    for (const obstacle of s.obstacles) {
      obstacle.x -= s.speed;

      const hit =
        characterBox.x < obstacle.x + obstacle.width &&
        characterBox.x + characterBox.width > obstacle.x &&
        characterBox.y < obstacle.y + obstacle.height &&
        characterBox.y + characterBox.height > obstacle.y;

      if (hit) {
        if (obstacle.type === "coin") {
          s.score += cfg.coinScore;
          obstacle.passed = true;
          playSfx(audioRef.current?.coin, isMutedRef.current);
        } else {
          playSfx(audioRef.current?.hit, isMutedRef.current);
          endGame();
          return;
        }
      }
    }

    s.obstacles = s.obstacles.filter((o) => o.x + o.width > -20 && !o.passed);

    s.distance += s.speed;
    s.score += (cfg.scorePerSecond * dt) / 1000;
  }

  function draw(ctx: CanvasRenderingContext2D) {
    const s = stateRef.current;
    const assets = assetsRef.current;
    if (!assets || s.canvasWidth === 0) return;

    ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

    // background looping
    const bgWidth = assets.background.width * (s.canvasHeight / assets.background.height);
    let x = s.bgOffset;
    while (x < s.canvasWidth) {
      ctx.drawImage(assets.background, x, 0, bgWidth, s.canvasHeight);
      x += bgWidth;
    }

    // tanah
    ctx.fillStyle = "rgba(4, 12, 28, 0.55)";
    ctx.fillRect(0, s.groundY, s.canvasWidth, s.canvasHeight - s.groundY);
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, s.groundY);
    ctx.lineTo(s.canvasWidth, s.groundY);
    ctx.stroke();

    // rintangan
    for (const obstacle of s.obstacles) {
      if (obstacle.type === "coin") {
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height / 2,
          obstacle.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.strokeStyle = "#b45309";
        ctx.lineWidth = 2;
        ctx.stroke();
        continue;
      }

      const style = OBSTACLE_STYLES[obstacle.type];
      ctx.fillStyle = style.fill;
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = 2;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      if (style.label) {
        ctx.fillStyle = "#f5b301";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(style.label, obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height * 0.72);
      }
    }

    // karakter
    const c = s.character;
    const frame = c.isJumping && assets.jumpFrame ? assets.jumpFrame : assets.runFrames[c.frameIndex];
    if (frame) {
      const height = getCharacterHeight(s.canvasWidth);
      const width = height * (frame.width / frame.height);
      const characterX = 70;
      const characterY = s.groundY - height + c.y;
      ctx.drawImage(frame, characterX, characterY, width, height);
    }

    // HUD skor
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`Skor: ${Math.floor(s.score)}`, s.canvasWidth - 16, 30);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(`Terbaik: ${Math.max(highScoreRef.current, Math.floor(s.score))}`, s.canvasWidth - 16, 48);
  }

  const loop = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!s.lastTimestamp) s.lastTimestamp = timestamp;
    const dt = Math.min(40, timestamp - s.lastTimestamp); // clamp biar ga lompat kalau tab sempat freeze
    s.lastTimestamp = timestamp;

    if (phaseRef.current === "running") {
      update(dt);
    }

    draw(ctx);
    rafRef.current = requestAnimationFrame(loop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = GAME_CONFIG.canvasHeight;

    const fresh = createInitialState();
    fresh.canvasWidth = width;
    fresh.canvasHeight = height;
    fresh.groundY = height - height * GAME_CONFIG.groundHeightRatio;
    stateRef.current = fresh;
  }, []);

  const startGame = useCallback(() => {
    if (phaseRef.current === "running" || !assetsRef.current) return;
    resetGame();
    setPhase("running");

    if (audioRef.current && !isMutedRef.current) {
      audioRef.current.bgm.currentTime = 0;
      audioRef.current.bgm.play().catch(() => {
        // autoplay bisa diblokir browser sebelum ada interaksi user — aman diabaikan
      });
    }
  }, [resetGame]);

  const jump = useCallback(() => {
    const current = phaseRef.current;

    if (current === "idle" || current === "gameover") {
      startGame();
      return;
    }
    if (current !== "running") return;

    const c = stateRef.current.character;
    if (!c.isJumping) {
      c.isJumping = true;
      c.velocityY = GAME_CONFIG.jumpForce;
      playSfx(audioRef.current?.jump, isMutedRef.current);
    }
  }, [startGame]);

  // ---- Kontrol keyboard: Spasi / Panah Atas ----
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full select-none overflow-hidden rounded-[28px] border-[6px] border-[#0a1330] bg-[#050b1a] shadow-[0_25px_60px_-15px_rgba(10,19,48,0.55)]"
    >
      <canvas ref={canvasRef} className="block w-full touch-none" onPointerDown={jump} />

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsMuted((prev) => !prev);
        }}
        aria-label={isMuted ? "Aktifkan suara" : "Matikan suara"}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-sm text-blue-100/80 transition-colors hover:bg-black/60 hover:text-white"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {phase === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050b1a]/90 text-sm font-medium text-blue-100">
          Memuat aset game...
        </div>
      )}

      {phase === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 px-4 text-center text-white">
          <p className="text-lg font-bold sm:text-xl">Tekan Spasi atau ketuk layar untuk mulai</p>
          <p className="text-xs text-blue-100/70">Lompati rintangan, kumpulkan koin, cetak skor tertinggi!</p>
          <button
            type="button"
            onClick={jump}
            className="mt-2 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
          >
            Mulai
          </button>
        </div>
      )}

      {phase === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 px-4 text-center text-white">
          <p className="text-xl font-extrabold">Game Over</p>
          <p className="text-sm text-blue-100/80">Skor: {finalScore}</p>
          <p className="text-xs text-blue-100/60">Skor Terbaik: {Math.max(highScore, finalScore)}</p>
          <button
            type="button"
            onClick={jump}
            className="mt-2 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
          >
            Main Lagi
          </button>
        </div>
      )}
    </div>
  );
}