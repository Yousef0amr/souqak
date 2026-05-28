import Link from "next/link";

interface AuthRedirectHintProps {
  mode: "login" | "signup" | "forgot";
  label: string;
  hintLabel: string;
  href?: string;
}

const AuthRedirectHint = ({ mode, label, hintLabel, href }: AuthRedirectHintProps) => {
  const defaultHref = {
    login: "/sign-up",
    signup: "/login",
    forgot: "/login",
  }[mode];

  return (
    <p className="text-center text-sm text-muted-foreground">
      {label}{" "}
      <Link
        href={href ?? defaultHref}
        className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
      >
        {hintLabel}
      </Link>
    </p>
  );
};

export { AuthRedirectHint };
