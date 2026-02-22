import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthLayout 
      title="Join Schedula" 
      subtitle="Your health journey starts here"
    >
      <SignUpForm />
    </AuthLayout>
  );
}