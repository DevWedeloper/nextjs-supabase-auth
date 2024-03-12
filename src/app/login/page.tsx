import AuthPageWrapper from '@/components/auth-page-wrapper';
import LoginForm from './login-form';

export default function Login() {
  return (
    <AuthPageWrapper
      title='Login'
      linkText="Don't have an account?"
      link='sign-up'
    >
      <LoginForm />
    </AuthPageWrapper>
  );
}
