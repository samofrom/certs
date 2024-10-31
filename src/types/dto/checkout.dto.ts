import { CheckoutFormType } from '../../services/CheckoutForm';

export type CheckoutDTO = {
  apiKey: string;
  ID: string;
  TABLENAME: string;
  PRIMARYKEY: string;
  PRICE: string;
  SUMMA: string;
} & CheckoutFormType;
