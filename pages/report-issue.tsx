import React from "react";
import MainLayout from "../src/layout/main";
import Page from "../src/components/Page";

const ReportIssue = () => {
  return (
    <Page
      title="Report-Issue"
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
      Report an issue
    </Page>
  );
};
ReportIssue.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ReportIssue;
