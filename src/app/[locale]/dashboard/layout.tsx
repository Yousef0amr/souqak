import { AppSidebar } from "@/shared/containers/AppSidebar";
import { RouteGuard } from "@/shared/containers/RouteGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppSidebar>
      <RouteGuard>{children}</RouteGuard>
    </AppSidebar>
  );
}
