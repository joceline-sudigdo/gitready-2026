"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, GitBranch, Play, RotateCcw, Triangle } from "lucide-react";
import * as THREE from "three";

import { RUN_FRAME_PATHS } from "@/constants/game-config";

type GamePhase = "idle" | "running" | "gameover" | "unsupported";
type ObstacleKind = "commit" | "conflict";

type TrackTile = THREE.Group & {
  userData: { startZ: number };
};

type RunnerObstacle = THREE.Group & {
  userData: {
    active: boolean;
    kind: ObstacleKind;
    lane: number;
    commitMesh: THREE.Mesh;
    conflictMesh: THREE.Mesh;
  };
};

type Runtime = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  runner: THREE.Sprite;
  runnerMaterial: THREE.SpriteMaterial;
  runnerTextures: THREE.Texture[];
  trackTiles: TrackTile[];
  obstacles: RunnerObstacle[];
  lastTimestamp: number;
  frameElapsed: number;
  frameIndex: number;
  spawnElapsed: number;
  nextSpawn: number;
  scoreElapsed: number;
  lane: number;
  jumpY: number;
  jumpVelocity: number;
};

const LANE_X = [-2.15, 0, 2.15] as const;
const RUNNER_Z = 2.2;
const RUNNER_GROUND_Y = 1.05;
const STORAGE_KEY = "gitready-viva-run-three-highscore";

function createTrackTile(index: number): TrackTile {
  const group = new THREE.Group() as TrackTile;
  const tileMaterial = new THREE.MeshStandardMaterial({
    color: index % 2 === 0 ? 0x07182f : 0x091e3a,
    roughness: 0.72,
    metalness: 0.16,
  });
  const tile = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.12, 4), tileMaterial);
  tile.receiveShadow = false;
  group.add(tile);

  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x2463eb, transparent: true, opacity: 0.34 });
  for (const x of [-1.08, 1.08]) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.015, 2.35), markerMaterial);
    marker.position.set(x, 0.075, 0);
    group.add(marker);
  }

  const startZ = -index * 4;
  group.position.set(0, 0, startZ);
  group.userData = { startZ };
  return group;
}

function createObstacle(): RunnerObstacle {
  const group = new THREE.Group() as RunnerObstacle;

  const commitMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 1),
    new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1d4ed8, emissiveIntensity: 1.2, metalness: 0.38, roughness: 0.22 }),
  );
  commitMesh.visible = false;
  group.add(commitMesh);

  const conflictMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 1.05, 1.05),
    new THREE.MeshStandardMaterial({ color: 0xff6b35, emissive: 0x7f1d1d, emissiveIntensity: 0.62, metalness: 0.18, roughness: 0.46 }),
  );
  conflictMesh.rotation.set(0.12, Math.PI / 4, 0.12);
  conflictMesh.visible = false;
  group.add(conflictMesh);

  group.visible = false;
  group.userData = { active: false, kind: "conflict", lane: 1, commitMesh, conflictMesh };
  return group;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => material.dispose());
  });
}

export function VivaRunThree() {
  const mountRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<Runtime | null>(null);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const phaseRef = useRef<GamePhase>("idle");
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);

  const [phase, setPhase] = useState<GamePhase>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const renderOnce = useCallback(() => {
    const runtime = runtimeRef.current;
    if (runtime) runtime.renderer.render(runtime.scene, runtime.camera);
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const finishGame = useCallback(() => {
    stopLoop();
    phaseRef.current = "gameover";
    setPhase("gameover");
    const nextHighScore = Math.max(highScoreRef.current, Math.floor(scoreRef.current));
    highScoreRef.current = nextHighScore;
    setHighScore(nextHighScore);
    try {
      localStorage.setItem(STORAGE_KEY, String(nextHighScore));
    } catch {
      // Storage may be unavailable in private browsing; the game can continue.
    }
  }, [stopLoop]);

  const animate = useCallback((timestamp: number) => {
    const runtime = runtimeRef.current;
    if (!runtime || phaseRef.current !== "running" || !visibleRef.current) {
      rafRef.current = null;
      return;
    }

    const delta = runtime.lastTimestamp === 0 ? 0 : Math.min((timestamp - runtime.lastTimestamp) / 1000, 0.04);
    runtime.lastTimestamp = timestamp;
    const speed = Math.min(18, 9.5 + scoreRef.current * 0.012);

    runtime.trackTiles.forEach((tile) => {
      tile.position.z += speed * delta;
      if (tile.position.z > 8) tile.position.z -= runtime.trackTiles.length * 4;
    });

    runtime.runner.position.x = THREE.MathUtils.damp(runtime.runner.position.x, LANE_X[runtime.lane], 13, delta);

    if (runtime.jumpY > 0 || runtime.jumpVelocity > 0) {
      runtime.jumpVelocity -= 13.5 * delta;
      runtime.jumpY += runtime.jumpVelocity * delta;
      if (runtime.jumpY <= 0) {
        runtime.jumpY = 0;
        runtime.jumpVelocity = 0;
      }
    }
    runtime.runner.position.y = RUNNER_GROUND_Y + runtime.jumpY;

    runtime.frameElapsed += delta;
    if (runtime.runnerTextures.length > 1 && runtime.frameElapsed >= 0.095) {
      runtime.frameElapsed = 0;
      runtime.frameIndex = (runtime.frameIndex + 1) % runtime.runnerTextures.length;
      runtime.runnerMaterial.map = runtime.runnerTextures[runtime.frameIndex];
      runtime.runnerMaterial.needsUpdate = true;
    }

    runtime.spawnElapsed += delta;
    if (runtime.spawnElapsed >= runtime.nextSpawn) {
      runtime.spawnElapsed = 0;
      runtime.nextSpawn = 0.78 + Math.random() * 0.72;
      const obstacle = runtime.obstacles.find((item) => !item.userData.active);
      if (obstacle) {
        const kind: ObstacleKind = Math.random() < 0.34 ? "commit" : "conflict";
        const lane = Math.floor(Math.random() * LANE_X.length);
        obstacle.userData.active = true;
        obstacle.userData.kind = kind;
        obstacle.userData.lane = lane;
        obstacle.userData.commitMesh.visible = kind === "commit";
        obstacle.userData.conflictMesh.visible = kind === "conflict";
        obstacle.visible = true;
        obstacle.position.set(LANE_X[lane], kind === "commit" ? 1.2 : 0.62, -38);
      }
    }

    for (const obstacle of runtime.obstacles) {
      if (!obstacle.userData.active) continue;
      obstacle.position.z += speed * delta;
      obstacle.rotation.y += delta * (obstacle.userData.kind === "commit" ? 2.8 : 0.55);

      const sameLane = Math.abs(obstacle.position.x - runtime.runner.position.x) < 0.72;
      const sameDepth = Math.abs(obstacle.position.z - RUNNER_Z) < 0.72;
      if (sameLane && sameDepth) {
        if (obstacle.userData.kind === "commit") {
          scoreRef.current += 25;
          obstacle.userData.active = false;
          obstacle.visible = false;
        } else if (runtime.jumpY < 0.78) {
          finishGame();
          renderOnce();
          return;
        }
      }

      if (obstacle.position.z > 7) {
        obstacle.userData.active = false;
        obstacle.visible = false;
      }
    }

    runtime.scoreElapsed += delta;
    scoreRef.current += delta * 9;
    if (runtime.scoreElapsed >= 0.12) {
      runtime.scoreElapsed = 0;
      setScore(Math.floor(scoreRef.current));
    }

    runtime.camera.position.x = THREE.MathUtils.damp(runtime.camera.position.x, runtime.runner.position.x * 0.12, 4, delta);
    runtime.camera.lookAt(runtime.runner.position.x * 0.08, 0.85, -9);
    runtime.renderer.render(runtime.scene, runtime.camera);
    rafRef.current = requestAnimationFrame(animate);
  }, [finishGame, renderOnce]);

  const startGame = useCallback(() => {
    const runtime = runtimeRef.current;
    if (!runtime || phaseRef.current === "unsupported") return;

    stopLoop();
    scoreRef.current = 0;
    setScore(0);
    runtime.lane = 1;
    runtime.jumpY = 0;
    runtime.jumpVelocity = 0;
    runtime.runner.position.set(LANE_X[1], RUNNER_GROUND_Y, RUNNER_Z);
    runtime.obstacles.forEach((obstacle) => {
      obstacle.userData.active = false;
      obstacle.visible = false;
    });
    runtime.spawnElapsed = 0;
    runtime.nextSpawn = 0.9;
    runtime.scoreElapsed = 0;
    runtime.lastTimestamp = 0;
    phaseRef.current = "running";
    setPhase("running");
    rafRef.current = requestAnimationFrame(animate);
  }, [animate, stopLoop]);

  const moveLane = useCallback((direction: -1 | 1) => {
    const runtime = runtimeRef.current;
    if (!runtime || phaseRef.current !== "running") return;
    runtime.lane = THREE.MathUtils.clamp(runtime.lane + direction, 0, LANE_X.length - 1);
  }, []);

  const jump = useCallback(() => {
    const runtime = runtimeRef.current;
    if (!runtime || phaseRef.current !== "running" || runtime.jumpY > 0.03) return;
    runtime.jumpVelocity = 6.3;
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      phaseRef.current = "unsupported";
      setPhase("unsupported");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020814);
    scene.fog = new THREE.FogExp2(0x020814, 0.043);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 4.6, 9.2);
    camera.lookAt(0, 0.85, -9);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "block h-full w-full touch-none";
    renderer.domElement.setAttribute("aria-label", "Arena tiga dimensi Viva Run");
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x9cc8ff, 0x020814, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x2563eb, 20, 30, 2);
    blueLight.position.set(0, 2, -8);
    scene.add(blueLight);

    const trackTiles = Array.from({ length: 14 }, (_, index) => createTrackTile(index));
    trackTiles.forEach((tile) => scene.add(tile));

    const runnerMaterial = new THREE.SpriteMaterial({ transparent: true, depthWrite: false });
    const runner = new THREE.Sprite(runnerMaterial);
    runner.position.set(0, RUNNER_GROUND_Y, RUNNER_Z);
    runner.scale.set(1.75, 1.55, 1);
    scene.add(runner);

    const obstacles = Array.from({ length: 10 }, () => createObstacle());
    obstacles.forEach((obstacle) => scene.add(obstacle));

    const runtime: Runtime = {
      scene,
      camera,
      renderer,
      runner,
      runnerMaterial,
      runnerTextures: [],
      trackTiles,
      obstacles,
      lastTimestamp: 0,
      frameElapsed: 0,
      frameIndex: 0,
      spawnElapsed: 0,
      nextSpawn: 0.9,
      scoreElapsed: 0,
      lane: 1,
      jumpY: 0,
      jumpVelocity: 0,
    };
    runtimeRef.current = runtime;

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          stopLoop();
        } else if (phaseRef.current === "running" && rafRef.current === null) {
          runtime.lastTimestamp = 0;
          rafRef.current = requestAnimationFrame(animate);
        } else {
          renderOnce();
        }
      },
      { threshold: 0.08 },
    );
    visibilityObserver.observe(mount);

    try {
      const storedHighScore = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
      if (Number.isFinite(storedHighScore)) {
        highScoreRef.current = storedHighScore;
        setHighScore(storedHighScore);
      }
    } catch {
      // Storage is optional; gameplay does not depend on it.
    }

    const textureLoader = new THREE.TextureLoader();
    Promise.all(RUN_FRAME_PATHS.map((path) => textureLoader.loadAsync(path)))
      .then((textures) => {
        if (runtimeRef.current !== runtime) {
          textures.forEach((texture) => texture.dispose());
          return;
        }
        textures.forEach((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
        });
        runtime.runnerTextures = textures;
        runtime.runnerMaterial.map = textures[0];
        runtime.runnerMaterial.needsUpdate = true;
        renderOnce();
      })
      .catch(() => {
        // The scene remains playable even if the optional character texture fails.
      });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (phaseRef.current !== "running") return;
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        moveLane(-1);
      } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        moveLane(1);
      } else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w" || event.code === "Space") {
        event.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      stopLoop();
      window.removeEventListener("keydown", handleKeyDown);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      runtime.runnerTextures.forEach((texture) => texture.dispose());
      runtime.runnerMaterial.dispose();
      runtime.trackTiles.forEach(disposeObject);
      runtime.obstacles.forEach(disposeObject);
      renderer.dispose();
      renderer.domElement.remove();
      runtimeRef.current = null;
    };
  }, [animate, jump, moveLane, renderOnce, stopLoop]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (phaseRef.current === "running" && visibleRef.current && rafRef.current === null) {
        if (runtimeRef.current) runtimeRef.current.lastTimestamp = 0;
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [animate, stopLoop]);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#020814] shadow-[0_28px_90px_rgba(1,8,24,0.42)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300"><GitBranch className="size-5" aria-hidden="true" /></span>
          <div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-200/45">branch / main</p><p className="text-sm font-semibold text-white">Viva Run: commit trail</p></div>
        </div>
        <div className="flex items-center gap-5 font-mono text-xs text-blue-100/65">
          <span>score <strong className="ml-1 text-white">{score}</strong></span>
          <span>best <strong className="ml-1 text-white">{highScore}</strong></span>
        </div>
      </div>

      <div className="relative h-[30rem] sm:h-[36rem] lg:h-[40rem]">
        <div ref={mountRef} className="absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,20,0.04)_45%,rgba(2,8,20,0.78)_100%)]" />

        {phase !== "running" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#020814]/38 px-6 text-center backdrop-blur-[2px]">
            <div className="max-w-md">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">{phase === "gameover" ? "merge conflict" : phase === "unsupported" ? "webgl unavailable" : "ready to run"}</p>
              <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">{phase === "gameover" ? `Skor ${score}` : phase === "unsupported" ? "Perangkat belum mendukung arena 3D." : "Kumpulkan commit. Hindari conflict."}</h3>
              {phase !== "unsupported" ? (
                <button type="button" onClick={startGame} className="group mx-auto mt-7 inline-flex min-h-12 items-center gap-3 rounded-lg bg-blue-600 px-6 font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  {phase === "gameover" ? <RotateCcw className="size-4" aria-hidden="true" /> : <Play className="size-4 fill-current" aria-hidden="true" />}
                  {phase === "gameover" ? "Coba lagi" : "Mulai lari"}
                </button>
              ) : null}
              {phase === "idle" ? <p className="mt-5 text-sm leading-6 text-blue-100/55">Gunakan A/D atau tombol arah untuk berpindah jalur. Space untuk melompat.</p> : null}
            </div>
          </div>
        ) : null}

        {phase === "running" ? (
          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 px-5 sm:bottom-7">
            <button type="button" onClick={() => moveLane(-1)} aria-label="Pindah ke jalur kiri" className="flex size-12 items-center justify-center rounded-xl border border-white/15 bg-[#07172c]/80 text-white backdrop-blur-md transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"><ArrowLeft className="size-5" aria-hidden="true" /></button>
            <button type="button" onClick={jump} aria-label="Lompat" className="flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-[#07172c]/80 px-5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"><Triangle className="size-4 fill-current" aria-hidden="true" />Lompat</button>
            <button type="button" onClick={() => moveLane(1)} aria-label="Pindah ke jalur kanan" className="flex size-12 items-center justify-center rounded-xl border border-white/15 bg-[#07172c]/80 text-white backdrop-blur-md transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"><ArrowRight className="size-5" aria-hidden="true" /></button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
