import React, { FC } from 'react';
import { Container, Grid2 as Grid, Link, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Page: FC = () => {
  return (
    <Grid
      component="section"
      container
      direction="column"
      gap={1}
      sx={{
        height: '100dvh',
        padding: 6,
      }}
    >
      <Grid component="main" size={12} flexGrow={1}>
        <Container>
          <Outlet />
        </Container>
      </Grid>

      <Grid component="footer" size={12}>
        <Container
          sx={{
            padding: 2,
          }}
        >
          <Grid container justifyContent="center" alignItems="center" gap={1}>
            <Typography variant="monospace" textAlign="center">
              Developed with ❤️ in 2024 by
            </Typography>
            <Link href="#" target="_blank">
              <Typography variant="monospace">@samofrom</Typography>
            </Link>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Page;
