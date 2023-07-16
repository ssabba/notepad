import { ReactNode } from "react";
// @mui
import { Box, Stack } from "@mui/material";
// components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <Header />
      <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box>
      <Footer />
    </Stack>
  );
}
