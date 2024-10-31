import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Page from './ui/Page';
import CertificateList from './services/CertificateList';
import CheckoutForm from './services/CheckoutForm';
import Payment from './services/Payment';
import PageNotFound from './ui/PageNotFound';
import Main from './ui/Main';

export const router = createBrowserRouter(
  [
    {
      element: <Page />,
      path: '/',
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: '/:apiKey',
          element: <CertificateList />,
        },
        {
          path: '/:apiKey/cart',
          element: <CheckoutForm />,
        },
        {
          path: '/:apiKey/payment',
          element: <Payment />,
        },
        {
          path: '*',
          element: <PageNotFound />,
        },
      ],
    },
  ],
  { basename: '/certs' }
);
