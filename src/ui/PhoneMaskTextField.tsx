import React from 'react';

import { PatternFormat } from 'react-number-format';

type PhoneMaskTextField = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const PhoneMaskTextField = React.forwardRef<
  HTMLInputElement,
  PhoneMaskTextField
>(({ onChange, ...other }, ref) => {
  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      format={'+7 (###) ###-##-##'}
      mask="_"
      allowEmptyFormatting={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: other.name,
            value: values.value,
          },
        });
      }}
    />
  );
});

PhoneMaskTextField.displayName = 'PhoneMaskTextField';

export default PhoneMaskTextField;
