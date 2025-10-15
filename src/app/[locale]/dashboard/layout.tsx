import { AppSidebar } from "@/shared/containers/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppSidebar>{children}</AppSidebar>;
}
