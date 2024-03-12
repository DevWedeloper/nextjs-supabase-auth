import AuthPageWrapper from '@/components/auth-page-wrapper';
import SignUpForm from './sign-up-form';

export default function SignUp() {
  return (
    <AuthPageWrapper title='Sign-Up' linkText='Have an account?' link='login'>
      <SignUpForm />
    </AuthPageWrapper>
  );
}
