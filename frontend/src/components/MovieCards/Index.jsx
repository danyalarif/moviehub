import { Button, Grid, Group, Text, createStyles } from "@mantine/core";
import { useState } from "react";
import MovieCard from "../MovieCard/Index";
import styles from "./styles";

const useStyles = createStyles((theme) => styles(theme));

export default function MovieCards({ movies, heading, setCurrentPage, getMovies }) {
  const { classes } = useStyles();
  return (
    <>
      <Group position="center" mt={8}>
        <Text className={classes.cardsHeading}>{heading}</Text>
      </Group>
      <Grid>
        {movies.map((movie) => {
          return (
            <Grid.Col xs={6} sm={4} lg={3} key={movie?._id}>
              <MovieCard movie={movie} />
            </Grid.Col>
          );
        })}
      </Grid>
      <Group position="center" mt={24}>
        <Button size="sm" onClick={() => {
          setCurrentPage((currentPage) => currentPage + 1);
          getMovies()
        }}>Show More</Button>
      </Group>
    </>
  );
}
