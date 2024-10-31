import React, { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
} from '@mui/material';
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
    <Paper>
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid size={12}>
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
      </Container>
    </Paper>
  );
};

export default Certificate;
