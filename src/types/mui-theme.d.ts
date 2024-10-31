import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    monospace: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    monospace?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    monospace: true;
  }
}
