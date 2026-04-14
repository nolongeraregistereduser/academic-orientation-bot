import { redirect } from "next/navigation";
import { orientationRoutes } from "@/config/routing";

export default function OrientationWizardPage() {
  redirect(orientationRoutes.demo);
}
