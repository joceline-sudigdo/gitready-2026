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
}
