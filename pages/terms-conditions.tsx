import React from "react";
import MainLayout from "../src/layout/main";
import Page from "../src/components/Page";

const TermsAndConditions = () => {
  return (
    <Page
      title="Terms & Conditions"
      meta={
        <>
          <meta
            name="description"
            // toDo
            content="wright the content of the page here. to appear in google search "
          />
        </>
      }
    >
      Terms and Conditions
    </Page>
  );
};
TermsAndConditions.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TermsAndConditions;
