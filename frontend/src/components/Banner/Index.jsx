import { createStyles, Text, Title, TextInput, Button, Image } from '@mantine/core';
import styles from './styles';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => styles(theme));

const fallbackMovie = {
  title: 'Avengers 2012',
  summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
  image: 'https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg',
  url: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
}

export default function Banner({movie}) {
  const { classes } = useStyles();
  const navigate = useNavigate()
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>{movie?.title || fallbackMovie.title}</Title>
        <Text fw={500} fz="lg" mb={5}>
          Today's featured movie
        </Text>
        <Text fz="sm" c="dimmed">
          {movie?.summary || fallbackMovie.summary}
        </Text>

        <div className={classes.controls}>
          <Button onClick={() => movie ? navigate(`/movie/${movie._id}`, {state: {movie}}) : fallbackMovie.url}>View Now</Button>
        </div>
      </div>
      <Image fit='cover' src={movie?.images?.[0] || fallbackMovie.image} radius={'md'} height={277} className={classes.image} />
    </div>
  );
}