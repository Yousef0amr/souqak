import { redirect } from "@/config/i18n/navigation";

const page = () => {
  redirect({ href: "/dashboard/products", locale: "en" });
};

export default page;
