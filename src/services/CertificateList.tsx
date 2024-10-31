import React, { FC, useCallback, useEffect } from 'react';
import { CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCertificates, selectProduct } from '../redux/slices/certificates';
import Certificate from '../ui/Certificate';
import { useNavigate, useParams } from 'react-router-dom';

const CertificateList: FC = () => {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.certificates);
  const navigate = useNavigate();
  const { apiKey } = useParams();

  useEffect(() => {
    if (apiKey && !list.length) {
      dispatch(fetchCertificates(apiKey));
    }
  }, []);

  const handleButtonClick = useCallback(
    (id: string) => {
      dispatch(selectProduct(id));
      navigate(`cart/`);
    },
    [dispatch, navigate, selectProduct]
  );

  if (status === 'failed')
    return (
      <Typography variant="h4" align="center">
        Wrong API key
      </Typography>
    );

  return status === 'pending' ? (
    <Grid container justifyContent="center">
      <CircularProgress size={120} />
    </Grid>
  ) : (
    <Grid container spacing={2}>
      {list.map(({ ID, ...certificate }) => (
        <Grid
          key={ID}
          component="article"
          size={{
            md: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <Certificate {...certificate} CTA={() => handleButtonClick(ID)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CertificateList;
