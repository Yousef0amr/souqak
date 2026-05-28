import AuthPageHeader from "../components/shared/AuthPageHeader";
import { AuthRedirectHint } from "../components/shared/AuthRedirectHint";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthPageHeader
        title="Welcome back"
        description="Sign in to your Souqak account to continue."
      />
      <LoginForm />
      <AuthRedirectHint
        mode="login"
        label="Don't have an account?"
        hintLabel="Create an account"
      />
    </>
  );
}
