import AuthPageWrapper from '@/components/auth-page-wrapper';
import ForgotPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <AuthPageWrapper
      title='Forgot Password'
      linkText='Have an account?'
      link='login'
    >
      <ForgotPasswordForm />
    </AuthPageWrapper>
  );
}
