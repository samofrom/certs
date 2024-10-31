import React, { FC } from 'react';

import {
  Button,
  Grid2 as Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import PhoneMaskTextField from '../ui/PhoneMaskTextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { checkoutUser } from '../redux/slices/certificates';

export type CheckoutFormType = {
  clientName: string;
  phone: string;
  msgText: string;
  email: string;
};

const CheckoutForm: FC = () => {
  const { selectedId, list } = useAppSelector((state) => state.certificates);
  const dispatch = useAppDispatch();

  const product = list.find((el) => el.ID === selectedId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormType>();

  const { apiKey } = useParams();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CheckoutFormType> = ({ phone, ...data }) => {
    if (apiKey && product) {
      dispatch(
        checkoutUser({
          apiKey,
          ID: product.ID,
          PRIMARYKEY: product.PRIMARYKEY,
          TABLENAME: product.TABLENAME,
          SUMMA: product.SUMMA,
          PRICE: product.PRICE,
          phone: phone.replaceAll(/[+7]|[()_\s-]/g, ''),
          ...data,
        })
      );
      navigate(`/${apiKey}/payment/`);
    }
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Paper>
        <Grid
          container
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {product ? (
            <Typography>{product.NAME}</Typography>
          ) : (
            <Typography>Корзина пуста</Typography>
          )}
          <Button onClick={() => navigate('..', { relative: 'path' })}>
            Назад
          </Button>
        </Grid>
      </Paper>

      {product && (
        <Paper>
          <Grid
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            container
            direction="column"
            alignItems="center"
            gap={2}
          >
            <TextField
              {...register('clientName', {
                required: 'Поле обязательно',
              })}
              autoFocus
              label="ФИО*"
              error={Boolean(errors.clientName)}
              helperText={errors.clientName?.message ?? ' '}
            />

            <TextField
              label="Телефон*"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message ?? ' '}
              slotProps={{
                input: {
                  inputComponent: PhoneMaskTextField as never,
                  inputProps: register('phone', {
                    required: 'Поле обязательно',
                    pattern: {
                      value: /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/,
                      message: 'Неверный формат телефона',
                    },
                  }),
                },
              }}
            />

            <TextField
              {...register('msgText', {
                maxLength: {
                  value: 128,
                  message: 'Достигнута максимальная длина сообщения',
                },
              })}
              label="Сообщение"
              error={Boolean(errors.msgText)}
              helperText={errors.msgText?.message ?? ' '}
              multiline
              rows={3}
            />

            <TextField
              {...register('email', {
                required: 'Поле обязательно',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Некорректный адрес',
                },
              })}
              label="Email*"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message ?? ' '}
            />

            <Button type="submit">Перейти к оплате</Button>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default CheckoutForm;
