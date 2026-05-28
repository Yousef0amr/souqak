import AuthLayout from "@/modules/auth/layouts/AuthLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
