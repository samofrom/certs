import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

const Payment: FC = () => {
  const { certNumber, status } = useAppSelector((state) => state.certificates);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle' && !certNumber) navigate('..', { relative: 'path' });
  }, []);

  return (
    <Box>
      {status === 'pending'
        ? 'Загрузка...'
        : `Оплата сертификата ${certNumber}...`}
    </Box>
  );
};

export default Payment;
