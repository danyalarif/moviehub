import { createStyles, Anchor, Group, ActionIcon, Text, useMantineTheme } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import styles from './styles';

const useStyles = createStyles((theme) => styles(theme));



export default function Footer({ links }) {
  const { classes } = useStyles();
  const theme = useMantineTheme()
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1, color: theme.colors.yellow[6] }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
      <Text sx={{fontSize: 24}}>CARHUB</Text>
        <Group className={classes.links}>{items}</Group>
        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}