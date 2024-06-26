import {
  Box,
  Card,
  Grid,
  Group,
  Stack,
  createStyles,
  useMantineTheme,
  Text,
  Image,
  Badge,
  Spoiler,
  Tabs,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import { genreColors } from "../../helpers/data";
import {
  IconArrowDown,
  IconCamera,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import Reviews from "../../components/Reviews/Index";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { showNotification } from "@mantine/notifications";
import { axiosDelete } from "../../helpers/axiosHelper";

const useStyles = createStyles((theme) => styles(theme));

export default function ViewMovie() {
  const movie = useLocation().state?.movie;
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useContext(UserContext)
  async function deleteMovie() {
    if (!user) {
      showNotification({
        title: "Error",
        message: "You need to login to delete a movie.",
        color: "red",
      });
      return
    }
    if (user._id !== movie.createdBy) {
      showNotification({
        title: "Error",
        message: "You are not authorized to delete this movie.",
        color: "red",
      });
      return
    }
    //calling delete api
    setIsLoading(true)
    try {
      const response = await axiosDelete(`/movie/${movie._id}`);
      if (response) {
        showNotification({
          title: "Success",
          message: "Movie deleted successfully.",
          color: "green",
        })
        //fetching the updated reviews
        navigate('/')
      }
    } catch(e) {
      //handling unknown errors
      console.log(e);
      showNotification({
        title: "Error",
        message: "An unknown error occured. Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <Box px={32} mt={16}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {/* Movie Information */}
      <Text className={classes.mainHeading}>Movie Information</Text>
      <Grid align="stretch">
        <Grid.Col sm={6} md={8}>
          <Box>
            <ReactPlayer
              url={movie?.video}
              width={"100%"}
              height={500}
              muted={true}
              loop={true}
              playing={true}
              controls={true}
              stopOnUnmount={true}
              pip={true}
              style={{ borderRadius: "8px" }}
            />
          </Box>
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
          <Card radius={"sm"} withBorder shadow="sm" className={classes.card}>
            <Group align="flex-start">
              <Box>
                <Image src={movie?.images[0]} alt={movie?.title} height={130} />
              </Box>
              <Stack spacing={4}>
                <Text className={classes.movieTitle}>{movie?.title}</Text>
                <Group spacing={4}>
                  <Text className={classes.secondaryText}>Duration: </Text>
                  <Text className={classes.secondaryText}>
                    {Math.floor(movie?.duration / 60)}h {movie?.duration % 60}
                    min
                  </Text>
                </Group>
                <Group mt={8}>
                  <Text className={classes.secondaryText}>Genres: </Text>
                  {movie?.genres.map((genre) => (
                    <Badge key={genre} color={genreColors[genre]}>
                      {genre}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Group>
            <Group position="center" mt={8}>
              <Text className={classes.styledHead}>Summary</Text>
            </Group>
            <Spoiler
              mt={8}
              maxHeight={80}
              showLabel="Show more"
              hideLabel="Hide"
            >
              <Text fw={500}>{movie?.summary}</Text>
            </Spoiler>
            <Group position="center">
              <Button color="red" onClick={() => deleteMovie()}>Delete Movie</Button>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Tabs */}
      <Tabs
        variant="pills"
        defaultValue={"reviews"}
        mt={"xl"}
        styles={(theme) => ({
          tab: {
            ":not(data-active)": {
              backgroundColor: "#f3f3fe",
            },
            ":hover": {
              backgroundColor: `${theme.colors.gray[2]}`,
            },
          },
        })}
        // orientation="vertical"
      >
        <Tabs.List mb={"md"} grow>
          <Tabs.Tab
            value="reviews"
            icon={<IconStarFilled size="1rem" />}
            px={100}
          >
            Reviews
          </Tabs.Tab>
          <Tabs.Tab value="gallery" icon={<IconCamera size="1rem" />} px={100}>
            Gallery
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="reviews">
          <Text className={classes.mainHeading}>Reviews</Text>
          <Reviews movie={movie} />
        </Tabs.Panel>
        <Tabs.Panel value="gallery" pb={16}>
          <Text className={classes.mainHeading}>Gallery</Text>
          <Grid>
            {
              movie?.images?.map(img => (
                <Grid.Col xs={6} sm={4} md={3} key={img}>
                  <Image src={img} alt={movie?.title} height={300} radius={'md'} />
                </Grid.Col>
              ))
            }
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
