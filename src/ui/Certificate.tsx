import React, { FC } from 'react';
import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { GetCertificatesDTO } from '../types/dto/get-certificates.dto';

import { ReactComponent as GiftCertificateSVG } from '../assets/svg/gift-certificate.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type CertificateProps = Omit<
  GetCertificatesDTO,
  'ID' | 'PRIMARYKEY' | 'TABLENAME'
> & {
  CTA: () => void;
};

const Certificate: FC<CertificateProps> = ({
  IMAGEURL,
  NAME,
  DESCRIPTION,
  PRICE,
  DISCOUNT,
  SUMMA,
  CTA,
}) => {
  return (
    <Paper
      sx={{
        position: 'relative',
        padding: '40px 10px 10px',
        height: '100%',
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing={3}
        sx={{
          height: '100%',
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'red',
          }}
        >
          -{Number(DISCOUNT)}%
        </Typography>
        <Grid
          size={12}
          sx={{
            minHeight: '64px',
          }}
        >
          <Typography variant="h6" align="center">
            {NAME}
          </Typography>
        </Grid>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
          }}
        >
          {IMAGEURL ? (
            <img src={IMAGEURL} alt={NAME} />
          ) : (
            <GiftCertificateSVG title={NAME} />
          )}
        </Box>
        {DESCRIPTION && <Grid size={12}>{DESCRIPTION}</Grid>}
        <Grid size={12} container justifyContent="flex-end">
          <Typography
            sx={{
              textDecoration: 'line-through',
            }}
          >
            {Number(PRICE)}₽
          </Typography>
          <Typography>{Number(SUMMA)}₽</Typography>
        </Grid>
        <Button startIcon={<ShoppingCartIcon />} fullWidth onClick={CTA}>
          Купить
        </Button>
      </Grid>
    </Paper>
  );
};

export default Certificate;
