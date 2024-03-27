import { LoginForm } from "@/components/auth/login-form";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-sky-500">
        {children}
    </div>
  );
};

export default layout;
