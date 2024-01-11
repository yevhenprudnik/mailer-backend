export interface Mail {
  id: number;
  topicId: number;
  content: string;
  published: boolean;
}

export interface CreateMail {
  topicId: number;
  content: string;
}

export interface UpdateMail {
  content: string;
}
