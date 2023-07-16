import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Mountain } from "./CardList";
import { useRouter } from "next/router";
import useLocales from "src/hooks/useLocales";

type Props = {
  item: Mountain;
};

const CardItem: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const {translate} = useLocales();
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardMedia
          sx={{ height: 180 }}
          image={item.imgURL}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {translate(item.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push(item?.href as string)}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardItem;
