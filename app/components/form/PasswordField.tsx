import { useState } from 'react';
import { IconButton, TextField } from '@radix-ui/themes';
import { UseFormRegisterReturn } from 'react-hook-form';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export interface PasswordFieldProps {
  register: UseFormRegisterReturn<any>;
}

export default function PasswordField({ register }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField.Root
      type={showPassword ? 'text' : 'password'}
      placeholder="********"
      {...register}
    >
      <TextField.Slot side="right" px="0">
        <IconButton
          type="button"
          variant="soft"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
}
