import React from "react";
import MainLayout from "../src/layout/main";
import Page from "../src/components/Page";
import NotepadEditor from "src/components/Notepad";

const Notepad = () => {
  return (
    <Page
      title="Web Notepad"
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
      <NotepadEditor />
    </Page>
  );
};
Notepad.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Notepad;
