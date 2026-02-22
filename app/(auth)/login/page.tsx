import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back!" 
      subtitle="Book appointments with top doctors"
    >
      <LoginForm />
    </AuthLayout>
  );
}