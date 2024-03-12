import AuthPageWrapper from '@/components/auth-page-wrapper';
import ResetPasswordForm from './reset-password-form';

export default function ResetPassword() {
  return (
    <AuthPageWrapper
      title='Reset Password'
      linkText='Have an account?'
      link='login'
    >
      <ResetPasswordForm />
    </AuthPageWrapper>
  );
}
