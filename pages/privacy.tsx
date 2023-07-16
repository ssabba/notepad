import React from "react";
import MainLayout from "../src/layout/main";
import Page from "../src/components/Page";

const privacy = () => {
  return (
    <Page
      title="Privacy"
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
      Privacy
    </Page>
  );
};
privacy.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default privacy;
