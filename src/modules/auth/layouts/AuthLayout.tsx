import AuthSliders from "../components/shared/AuthSliders";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-background transition-colors duration-300">
      {/* Left — Slider panel */}
      <div className="hidden lg:flex lg:p-6 xl:p-8 min-h-screen">
        <AuthSliders />
      </div>

      {/* Right — Form panel */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
