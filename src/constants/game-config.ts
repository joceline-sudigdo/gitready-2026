// constants/game-config.ts

// ==== SPRITE KARAKTER ====
// Ganti / tambah path di sini sesuai jumlah frame lari yang kamu punya.
// Taruh file-nya di folder: public/sprites/robot-run/frame-1.png, frame-2.png, dst.
// Urutan array = urutan animasi. Bebas mau berapa frame (5, 8, 12, dst).
export const RUN_FRAME_PATHS: string[] = [
  "images/sprites/run/frame-1.png",
  "images/sprites/run/frame-2.png",
  "images/sprites/run/frame-3.png",
  "images/sprites/run/frame-4.png",
  "images/sprites/run/frame-5.png",
];

// Opsional: frame khusus saat karakter melompat.
// Kalau belum punya, biarkan null → nanti fallback pakai frame lari saat ini.
export const JUMP_FRAME_PATH: string | null = null;

// ==== BACKGROUND ====
export const BACKGROUND_IMAGE_PATH = "images/background.png";

// ==== KONFIGURASI GAMEPLAY (bebas kamu tuning) ====
export const GAME_CONFIG = {
  canvasHeight: 320, // tinggi area game (px), lebar mengikuti container
  groundHeightRatio: 0.16, // porsi tinggi canvas yang jadi "tanah"
  gravity: 0.9,
  jumpForce: -15.5,
  baseSpeed: 6,
  maxSpeed: 14,
  speedIncreasePerSecond: 0.045, // makin lama makin cepat
  frameDurationMs: 90, // kecepatan ganti frame animasi lari
  characterSize: 76, // tinggi karakter dalam px
  obstacleMinGapMs: 900,
  obstacleMaxGapMs: 1900,
  scorePerSecond: 10,
  coinScore: 25,
  highScoreStorageKey: "gitready-runner-highscore",
} as const;

export type ObstacleType = "crate" | "warning" | "coin";

// Rintangan digambar langsung di canvas (bukan sprite) supaya kamu tidak
// perlu asset tambahan dulu. Warnanya sudah disamakan dengan nuansa
// background cyberpunk kamu. Nanti gampang diganti ke gambar kalau mau.
export const OBSTACLE_STYLES: Record<
  Exclude<ObstacleType, "coin">,
  { width: number; height: number; fill: string; stroke: string; label: string }
> = {
  crate: { width: 34, height: 34, fill: "#8a5a2b", stroke: "#3d2610", label: "" },
  warning: { width: 42, height: 40, fill: "#1c2340", stroke: "#f5b301", label: "!" },
};