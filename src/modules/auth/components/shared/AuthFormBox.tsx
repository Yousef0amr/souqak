const AuthFormBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-card border-border max-w-110 w-full space-y-6 rounded-2xl border p-8 shadow-[0px_30px_34px_-22px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  );
};

export default AuthFormBox;
