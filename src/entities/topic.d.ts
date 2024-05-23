import { User } from './user';

export interface Topic {
  id: number;
  authorId: number;
  author?: User;
  name: string;
  description: string;
  subscribersCount: number;
  followed: boolean;
}

export interface CreateTopic {
  name: string;
  description: string;
}

export interface UpdateTopic {
  name?: string;
  description?: string;
}
