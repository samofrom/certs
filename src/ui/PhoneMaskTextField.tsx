import React, { useCallback, useState } from 'react';

import { PatternFormat } from 'react-number-format';

type PhoneMaskTextField = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  onFocus: () => void;
  onBlur: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const PhoneMaskTextField = React.forwardRef<
  HTMLInputElement,
  PhoneMaskTextField
>(({ onChange, onFocus, onBlur, ...other }, ref) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
    onFocus();
  }, [onFocus]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);
      onBlur({
        target: {
          name: other.name,
          value: event.target.value,
        },
      });
    },
    [onBlur]
  );

  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      format={'+7 (###) ###-##-##'}
      mask="_"
      allowEmptyFormatting={hasFocus}
      onValueChange={(values) => {
        onChange({
          target: {
            name: other.name,
            value: values.formattedValue,
          },
        });
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

PhoneMaskTextField.displayName = 'PhoneMaskTextField';

export default PhoneMaskTextField;
