import { Suspense } from "react";
import AuthPageHeader from "../components/shared/AuthPageHeader";
import { AuthRedirectHint } from "../components/shared/AuthRedirectHint";
import NewPasswordForm from "../components/NewPasswordForm";

export default function NewPasswordPage() {
  return (
    <>
      <AuthPageHeader
        title="Set new password"
        description="Create a strong password for your account."
      />
      <Suspense fallback={null}>
        <NewPasswordForm />
      </Suspense>
      <AuthRedirectHint
        mode="forgot"
        label="Changed your mind?"
        hintLabel="Back to sign in"
      />
    </>
  );
}
