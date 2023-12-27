import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  LoadingOverlay,
  Textarea,
  Box,
  Stack,
  Group,
  MultiSelect,
} from "@mantine/core";
import { useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

import { axiosPost } from "../../helpers/axiosHelper";
import {
  durationValidation,
  genresValidation,
  summaryValidation,
  titleValidation,
} from "./validations";

export default function AddMovie() {
  //form containing all the input fields, and their validations
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      summary: "",
      releaseDate: "",
      genres: [],
      duration: 0,
      movieImages: "",
      video: "",
    },
    validate: {
      title: (value) => titleValidation(value),
      summary: (value) => summaryValidation(value),
      genres: (value) => genresValidation(value),
      duration: (value) => durationValidation(value),
    },
  });
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function addMovie(values) {
    setIsLoading(true);
    values.images = values.movieImages.split('\n')
    delete values.movieImages
    try {
      const response = await axiosPost("/movie", values);
      if (response) {
        showNotification({
          title: "Success",
          message: "Movie Added Successfully!",
          color: "green",
        });
        //form.reset();
      }
    } catch (e) {
      //handling unknown errors
      console.log(e);
      showNotification({
        title: "Error",
        message: "An unknown error occured. Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Box px={32} mt={16}>
      <Title order={2} align="center" mt="md" mb={20}>
        Add Movie
      </Title>
      <form onSubmit={form.onSubmit((values) => addMovie(values))}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Enter movie title"
            {...form.getInputProps("title")}
            withAsterisk
          />
          <Textarea
            label="summary"
            placeholder="Enter movie summary"
            {...form.getInputProps("summary")}
            withAsterisk
          />
          <TextInput
            label="Duration (mins)"
            placeholder="Enter movie duration in minutes"
            type="number"
            {...form.getInputProps("duration")}
            withAsterisk
          />
          <MultiSelect
            label="Genres"
            placeholder="Select movie genres"
            data={["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Science", "Thriller", "Animation", "Documentary", "Family", "Musical", "War", "Western", "Crime", "Historical", "Biography", "Sports"]}
            {...form.getInputProps('genres')}
          />
          <Textarea
            label="Images"
            placeholder="Enter movie images urls"
            {...form.getInputProps("movieImages")}
          />
          <TextInput
            label="Video"
            placeholder="Enter movie video"
            {...form.getInputProps("video")}
          />
          <Group position="center">
            <Button
              type="submit"
              mt="xl"
              size="md"
              loading={isLoading}
              loaderPosition="center"
            >
              Add Movie
            </Button>
          </Group>
          
        </Stack>
      </form>
    </Box>
  );
}
