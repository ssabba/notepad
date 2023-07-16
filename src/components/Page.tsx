import Head from "next/head";
import { forwardRef, ReactNode } from "react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Head>
        <title>{`${title} | website-title`}</title>
        {meta}
      </Head>

      <Box sx={{ height: "100%" }} ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
