import { IsStrongPassword } from 'class-validator';
import { MatchWithProp } from '@/app/lib/decorators/match-with-prop.decorator';

export class ResetPasswordDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  password!: string;

  @MatchWithProp('password')
  confirmPassword!: string;
}
