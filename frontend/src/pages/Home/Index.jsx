import { Box, Button, Grid, Group, LoadingOverlay, TextInput } from "@mantine/core";
import Banner from "../../components/Banner/Index";
import MovieCards from "../../components/MovieCards/Index";
import { useContext, useEffect, useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import {axiosGet} from '../../helpers/axiosHelper'
import { showNotification } from "@mantine/notifications";
import {UserContext} from '../../contexts/UserContext'
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 4

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  async function getMovies() {
    setIsLoading(true)
    //attaching filters to movie
    const url = `/movie/${JSON.stringify(search ? {title: {$regex: search.trim()}} : {})}/0/${(currentPage * PAGE_SIZE)}`
    try {
      const response = await axiosGet(url);
      if (response) setMovies(response);
    } catch (e) {
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
  function handleAddMovie() {
    if (!user) {
      showNotification({
        title: "Error",
        message: "You need to login to add a movie.",
        color: "red",
      });
      return
    }
    navigate('/movie/add')
  }
  useEffect(() => {
    getMovies()
  }, [])
  return (
    <Box px={32} mt={16}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Banner movie={movies[0]} />
      <Grid mt={16} justify="flex-end" align="center">
        <Grid.Col offset={3} md={6}>
          <Group align="center">
            <TextInput
              placeholder="Search movie by title"
              icon={<IconSearch />}
              w={"70%"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button size="sm" onClick={() => {
              setCurrentPage(1)
              getMovies()
            }}>Search</Button>
          </Group>
        </Grid.Col>
        <Grid.Col md={3}>
          <Group position="right">
            <Button sx={{ alignSelf: "end" }} leftIcon={<IconPlus />} size="sm" onClick={() => handleAddMovie()}>
              Add Movie
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <MovieCards movies={movies} heading={"Featured Movies"} setCurrentPage={setCurrentPage} getMovies={getMovies} />
    </Box>
  );
}
