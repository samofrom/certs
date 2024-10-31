import { CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useAppSelector } from '../redux/hooks';

const Payment: FC = () => {
  const { certNumber, status } = useAppSelector((state) => state.certificates);

  return (
    <Grid container justifyContent="center">
      {status === 'pending' ? (
        <CircularProgress size={120} />
      ) : (
        <Typography>Оплата сертификата {certNumber}...</Typography>
      )}
    </Grid>
  );
};

export default Payment;
