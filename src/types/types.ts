export type ResponseType<T> = {
  data: Array<T>;
  result: 0; // | ?
  resultDescription: 'OK'; // | '?'
};

export type CertificateType = {
  id: string;
  tableName: string;
  primaryKey: string;
  name: string;
  description: string;
  price: string;
  summa: string;
  discount: string;
};

export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';
