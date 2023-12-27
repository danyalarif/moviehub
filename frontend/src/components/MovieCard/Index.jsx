import { Card, Image, Stack, createStyles, Text, Group, Rating, Box, Badge } from "@mantine/core";
import styles from "./styles";
import {IconClock} from '@tabler/icons-react'
import { useNavigate } from "react-router-dom";
import { genreColors } from "../../helpers/data";
const useStyles = createStyles((theme) => styles(theme))

export default function MovieCard({movie}) {
    const {classes} = useStyles()
    const navigate = useNavigate()
    return (
        <Card shadow="sm" padding="xs" radius="md" withBorder className={classes.card} onClick={() => navigate(`/movie/${movie?._id}`, {state: {movie}})}>
            {/* Image section of card without any padding */}
            <Card.Section>
                <Image height={300} src={movie?.images[0]} alt={movie?.title} />
            </Card.Section>
            {/* Rest of the card */}
            <Stack spacing={0} pt={'sm'} pb={'xs'}>
                <Group position="apart">
                    <Text className={classes.cardTitle}>{movie?.title}</Text>
                </Group>
                <Group position="apart">
                    <Group spacing={4} align="center">
                        <IconClock size={18} />
                        <Text className={classes.headingSubTitle}>{Math.floor(movie?.duration / 60)}h {movie?.duration % 60}min</Text>
                    </Group>
                    <Group spacing={0}>
                        <Rating readOnly value={1} count={1} />
                        <Text fz="sm" fw={500}>
                            {movie?.avgRating}{' '}
                            <Text component='span' size={'xs'} c={'dimmed'}>({movie?.totalReviews} reviews)</Text>
                        </Text>
                    </Group>
                    <Group>
                        {
                            movie?.genres.map(genre => (
                                <Badge key={genre} color={genreColors[genre]}>{genre}</Badge>
                            ))
                        }
                    </Group>
                </Group>
            </Stack>
        </Card>
    )
}