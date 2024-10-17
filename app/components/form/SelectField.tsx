import { Select } from '@radix-ui/themes';
import { Control, Controller } from 'react-hook-form';
import { CSSProperties } from 'react';

export interface SelectProps {
  placeholder?: string;
  fieldName: string;
  control: Control<any>;
  items: Array<{
    label: string;
    value: string;
  }>;
  defaultValue?: string;
  style?: CSSProperties;
}

export default function SelectField({
  items,
  control,
  fieldName,
  placeholder,
  defaultValue,
  style,
}: SelectProps) {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select.Root onValueChange={field.onChange} {...field}>
          <Select.Trigger
            style={style}
            variant="surface"
            className="SelectTrigger"
            placeholder={placeholder}
          />
          <Select.Content position="popper">
            {items.map((item) => (
              <Select.Item value={item.value} key={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    />
  );
}
