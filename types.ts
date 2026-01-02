
export interface Program {
  id: string;
  title: string;
  age: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  category: string;
}

export interface ChildProfile {
  name: string;
  birthDate: string;
  photoUrl: string | null;
  class: string;
}
