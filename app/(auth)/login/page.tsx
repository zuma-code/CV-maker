import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Iniciar Sesión - CV Maker",
  description: "Inicia sesión en tu cuenta de CV Maker",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}


