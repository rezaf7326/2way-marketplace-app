'use client';
import { TextProps, Text, useThemeContext } from '@radix-ui/themes';

export default function AccentText(props: TextProps) {
  return <Text {...props} color={useThemeContext().accentColor} />;
}
