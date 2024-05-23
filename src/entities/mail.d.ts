export interface Mail {
  id: number;
  title: string;
  topicId: number;
  content: string;
  published: boolean;
  createdAt: Date;
}

export interface CreateMail {
  topicId: number;
  content: string;
}

export interface UpdateMail {
  content: string;
}
