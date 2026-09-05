export interface LearningPoint {
  id: string;
  title: string;
  description: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  /** Scale applied to the photo inside its circle frame (default 1). Use <1 to zoom out. */
  photoScale?: number;
  /** Vertical offset (in %) applied to the photo inside its circle frame (default 0). Use negative to shift up. */
  photoOffsetY?: number;
}
