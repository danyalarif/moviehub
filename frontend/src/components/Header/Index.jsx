import { useContext, useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import { UserContext } from "../../contexts/UserContext";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => styles(theme, HEADER_HEIGHT));

export default function CustomHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { user } = useContext(UserContext);
  const [links, setLinks] = useState([
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Logout",
      link: "/logout",
    },
  ]);
  //setting navigations links based on user state
  useEffect(() => {
    if (!user)
    setLinks([
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Login",
          link: "/auth/login",
        },
        {
          label: "Register",
          link: "/auth/register",
        },
      ]);
    else
    setLinks([
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Logout",
          link: "/auth/logout",
        },
      ]);
  }, [user]);
  const [active, setActive] = useState(links[0].link);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Text
          sx={{ color: theme.colors.yellow[6], fontSize: 24, letterSpacing: 3 }}
        >
          MOVIEHUB
        </Text>
        <Group spacing={16} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
