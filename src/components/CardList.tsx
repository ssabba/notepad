import React from "react";
import CardItem from "./CardItem";
import { Container, Grid } from "@mui/material";

export type Mountain = {
  imgURL: string;
  title: string;
  description: string;
  href?:string;
};

type Props = {
  DUMMY_DATA: Mountain[];
};

const CardList: React.FC<Props> = ({ DUMMY_DATA }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {DUMMY_DATA.map(item => (
          <CardItem item={item} />
        ))}
      </Grid>
    </Container>
  );
};

export default CardList;
