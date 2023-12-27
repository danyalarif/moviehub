const styles = (theme) => ({
  wrapper: {
    backgroundSize: "cover",
    minHeight: "100vh",
    backgroundImage:
      "url(https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "100vh",
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colors.yellow[6],
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  customAnchor: {
    color: theme.colors.yellow[6],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    }
  }
});
