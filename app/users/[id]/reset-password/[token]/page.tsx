import { UserIdProps } from '@/app/users/[id]/props.interface';
import ResetPasswordForm from '@/app/users/[id]/reset-password/[token]/ResetPasswordForm';

export default function ResetPasswordPage(props: UserIdProps) {
  return (
    <ResetPasswordForm
      userId={+props.params.id}
      resetToken={props.params.token}
    />
  );
}
