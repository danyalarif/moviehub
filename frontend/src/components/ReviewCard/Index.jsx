import { Avatar, Box, Group, Paper, Rating, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";

const ReviewCard = ({ review, handleEditReview, handleDeleteReview }) => {
  return (
    <Paper withBorder radius="md" p={"md"} shadow="sm">
      <Group position="apart">
        <Group>
          <Avatar
            src={review?.user?.profilePicture}
            alt={"person picture"}
            radius="xl"
          />
          <div style={{ marginTop: "0.1rem" }}>
            <Text fz="sm" fw={500}>
              {review?.user?.firstName + " " + review?.user?.lastName}
            </Text>
            <Text fz="sm" c="dimmed">
              {new Date(review?.createdAt).toLocaleString()}
            </Text>
          </div>
        </Group>
        <Box>
          <Group spacing={5}>
            <Rating readOnly value={1} count={1} />
            <Text fz="sm" fw={500}>
              {review?.stars}
            </Text>
          </Group>
          <Group spacing={2} position="right" mt={4}>
            <IconEdit data-testid='edit-icon' size={18} color="green" style={{cursor: 'pointer'}} onClick={() => handleEditReview(review)} />
            <IconTrash data-testid='delete-icon' size={18} color="red" style={{cursor: 'pointer'}} onClick={() => handleDeleteReview(review)} />
          </Group>
        </Box>
      </Group>
      <Text ta="justify" size={"sm"} mt={"sm"}>
        {review?.description}
      </Text>
    </Paper>
  );
};

export default ReviewCard;
