import { ReactNode } from "react";
// components
import MainLayout from "./main";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: "main" | "logoOnly";
};

export default function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
