import { Box, Container, Stack } from "@mui/material";
import React from "react";
import theme from "../theme/theme";
import useLocales from "../hooks/useLocales";
import Link from "next/link";

const Footer = () => {
  const { translate } = useLocales();
  return (
    <footer>
      <Box sx={{ background: theme.palette.primary.main, p: 2 }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Link color="#fff" href="./report-issue">
              {translate("reportIssue")}
            </Link>
            <Link color="#ffff" href="./privacy">
              {translate("privacy")}
            </Link>
            <Link color="#ffff" href="./terms-conditions">
              {translate("termsAndConditions")}
            </Link>
          </Stack>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
