import { Box, Button, Group, LoadingOverlay, Modal, Rating, ScrollArea, Stack, Textarea, createStyles, Text } from "@mantine/core";
import styles from "./styles";
import ReviewCard from "../ReviewCard/Index";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { showNotification } from "@mantine/notifications";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../../helpers/axiosHelper";

const useStyles = createStyles((theme) => styles(theme));

export default function Reviews({ movie }) {
  const { classes } = useStyles();
  const [reviews, setReviews] = useState([])
  const {user} = useContext(UserContext)
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('')
  const [stars, setStars] = useState(1)
  const [review, setReview] = useState(undefined)  //state for determining if review is being edited
  const [isLoading, setIsLoading] = useState(false)
  async function getReviews() {
    try {
      const response = await axiosGet(`/review/${movie?._id}`);
      if (response) setReviews(response)
    } catch (e) {
      //handling unknown errors
      console.log(e);
      showNotification({
        title: "Error",
        message: "An unknown error occured. Please try again later.",
        color: "red",
      });
    } 
  }
  //for submitting the review to api
  async function submitReview() {
    if (reviewText.length === 0) {
      showNotification({
        title: "Error",
        message: "Review cannot be empty.",
        color: "red",
      })
      return
    }
    setIsLoading(true)
    const body = {
      movie: movie._id,
      description: reviewText,
      stars: stars
    }
    try {
      const response = review ? await axiosPut(`/review/${review._id}`, body) : await axiosPost("/review", body);
      if (response) {
        showNotification({
          title: "Success",
          message: `Review ${review ? 'updated' : 'added'} successfully.`,
          color: "green",
        })
        setReviewText('')
        setAddModalVisible(false)
        //fetching the updated reviews
        getReviews()
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
  //for triggring the state of the modal
  function handleAddReview() {
    if (!user) {
      showNotification({
        title: "Error",
        message: "You need to login to add a review.",
        color: "red",
      });
      return
    }
    //resetting states
    setReviewText('')
    setReview(undefined)
    setAddModalVisible(true)
  }
  function handleEditReview(selectedReview) {
    if (!user) {
      showNotification({
        title: "Error",
        message: "You need to login to edit a review.",
        color: "red",
      });
      return
    }
    if (user._id !== selectedReview.user._id) {
      showNotification({
        title: "Error",
        message: "You are not authorized to edit this review.",
        color: "red",
      });
      return
    }
    setReview(selectedReview)
    setReviewText(selectedReview.description)
    setAddModalVisible(true)
  }
  async function handleDeleteReview(selectedReview) {
    if (!user) {
      showNotification({
        title: "Error",
        message: "You need to login to delete a review.",
        color: "red",
      });
      return
    }
    if (user._id !== selectedReview.user._id) {
      showNotification({
        title: "Error",
        message: "You are not authorized to delete this review.",
        color: "red",
      });
      return
    }
    //calling delete api
    setIsLoading(true)
    try {
      const response = await axiosDelete(`/review/${selectedReview._id}`);
      if (response) {
        showNotification({
          title: "Success",
          message: "Review deleted successfully.",
          color: "green",
        })
        //fetching the updated reviews
        getReviews()
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
  useEffect(() => {
    getReviews()
  }, [movie])
  return (
    <Box>
      {/* Add Review modal */}
      <Modal opened={addModalVisible} onClose={() => setAddModalVisible(false)} centered title={`${review ? 'Update' : 'Add'} Review`}>
        <Stack spacing={12}>
          <Text fw={500}>Select Rating</Text>
          <Rating value={stars} onChange={setStars} fractions={2} />
          <Textarea label='Review' placeholder="Enter your review" value={reviewText} onChange={e => setReviewText(e.target.value)} />
          <Group position="apart">
            <Button color="red" onClick={() => setAddModalVisible(false)}>Cancel</Button>
            <Button onClick={() => submitReview()}>{`${review ? 'Update' : 'Add'} Review`}</Button>
          </Group>
        </Stack>
      </Modal>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {/* Reviews */}
      <Group position="right" mb={16}>
        <Button leftIcon={<IconPlus />} onClick={() => handleAddReview()}>Add Review</Button>
      </Group>
        <Stack spacing={12} pb={16}>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review._id} handleEditReview={handleEditReview} handleDeleteReview={handleDeleteReview} />
          ))}
        </Stack>
    </Box>
  );
}
