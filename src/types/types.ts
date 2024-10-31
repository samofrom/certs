export type ResponseType<T> = {
  data: Array<T>;
  result: number;
  resultDescription: string;
};

export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';
