import Page from "../src/components/Page";
import Header from "../src/components/Header";
import CardList from "../src/components/CardList";
import Footer from "../src/components/Footer";
import { useState } from "react";
import { Box, Stack } from "@mui/material";

//----------------------------------------------------//
export type Mountain = {
  imgURL: string;
  title: string;
  href?:string;
  description: string;
};

const DUMMY_DATA: Mountain[] = [
  {
    imgURL: "./assets/images/notepad.jpg",
    title: "notepad",
    href:"./notepad",
    description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
  {
    imgURL: "./assets/images/game.jpg",
    title: "game",
    href:"./game/index.html",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
  {
    imgURL: "./assets/images/mountain.jpg",
    title: "Rocky Mountains",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
  {
    imgURL: "./assets/images/mountain2.jpg",
    title: "Pyrenees Mountains",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
  {
    imgURL: "./assets/images/mountain.jpg",
    title: "Himalayas Mountain",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
  {
    imgURL: "./assets/images/mountain2.jpg",
    title: "Fold Mountain",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quae doloremque assumenda quo non, dolores nisi quaerat similique in aperiam adipisci perspiciatis, asperiores odit fugit veritatis explicabo? Temporibus, quis perspiciatis.",
  },
];

//----------------------------------------------------//
function ResponsiveAppBar() {
  const [result, setResult] = useState(DUMMY_DATA);
  return (
    <Page
      title="Landing"
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
      <Stack sx={{ minHeight: 1 }}>
        <Header setResult={setResult} data={DUMMY_DATA} search />
        <Box sx={{ flexGrow: 1, p: 2, minHeight: "86vh" }}>
          <br />
          <CardList DUMMY_DATA={result} />
        </Box>
        <Footer />
      </Stack>
    </Page>
  );
}
export default ResponsiveAppBar;
