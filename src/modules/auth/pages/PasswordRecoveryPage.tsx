import AuthPageHeader from "../components/shared/AuthPageHeader";
import { AuthRedirectHint } from "../components/shared/AuthRedirectHint";
import PasswordRecoveryForm from "../components/PasswordRecoveryForm";

export default function PasswordRecoveryPage() {
  return (
    <>
      <AuthPageHeader
        title="Forgot your password?"
        description="Enter your email and we'll send you a reset link."
      />
      <PasswordRecoveryForm />
      <AuthRedirectHint
        mode="forgot"
        label="Remember your password?"
        hintLabel="Back to sign in"
      />
    </>
  );
}
