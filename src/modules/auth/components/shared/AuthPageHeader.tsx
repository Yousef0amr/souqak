interface AuthPageHeaderProps {
  title: string;
  description?: string;
}

const AuthPageHeader = ({ title, description }: AuthPageHeaderProps) => {
  return (
    <div className="space-y-1.5">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default AuthPageHeader;
