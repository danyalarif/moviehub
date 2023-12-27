const styles = (theme) => {
  return {
    wrapper: {
      backgroundSize: "cover",
      minHeight: "91.8vh",
      backgroundImage:
        "url(https://www.topgear.com/sites/default/files/2022/07/6_0.jpg)",
    },

    form: {
      borderRight: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      minHeight: "91.8vh",
      maxWidth: 550,
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
  };
};
export default styles;
