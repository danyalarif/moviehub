const getTheme = (colorScheme = "light") => {
  return {
    colorScheme: colorScheme,
    fontFamily: "Poppins",
    colors: {
      yellow: [
        "#fff8e1",
        "#ffefcc",
        "#ffdd9b",
        "#ffca64",
        "#ffba38",
        "#ffb01b",
        "#ffab09",
        "#e39500",
        "#ca8500",
        "#af7100"
      ],
    },
    primaryColor: "yellow",
    fontFamily: "Poppins",

    components: {
      Modal: {
        styles: (theme) => ({
          header: {
            marginBottom: "1.5rem",
          },
          title: {
            flex: 1,
            textAlign: "center",
            fontWeight: "700",
            fontFamily: "cursive",
            letterspacing: 1,
            fontSize: "1rem",
          },
          close: {
            background: theme.colors.yellow[6],
            color: theme.white,
            transition: "background 0.2s ease",
            "&:hover": {
              background: theme.colors.yellow[4],
            },
          },
        }),
      },
      Notification: {
        styles: (theme) => ({
          root: {
            zIndex: 99,
          },
        }),
      },
      Input: {
        styles: (theme) => ({
          input: {
            "&:focus-within": {
              // boxShadow: `0 0 2pt 0.3pt ${theme.colors.yellow[6]}` ,
              border: `2px solid ${theme.colors.yellow[6]}`,
              outline: "none",
            },
            "&:hover:not(:focus)": {
              border: `1px solid rgba(0, 0, 0, 0.9)`,
            },
          },
          wrapper: {
            "&:focus-within": {
              svg: {
                color: `${theme.colors.yellow[6]} !important`,
                opacity: 2,
              },
            },
            "&:hover:not(:focus)": {
              svg: {
                color: `rgba(0, 0, 0, 0.9)`,
                opacity: 1,
              },
            },
          },
        }),
        defaultProps: {
          radius: "5px",
        },
      },
      InputWrapper: {
        styles: (theme) => ({
          label: {
            marginBottom: "0.25rem",
          },
          error: {
            color: "#fa5252",
          },
        }),
      },
      TextInput: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      PasswordInput: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      ColorInput: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      NumberInput: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      Select: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      Textarea: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      DatePicker: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      TimeInput: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      MultiSelect: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      Autocomplete: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
      Button: {
        defaultProps: {
          size: "md",
          radius: "4px",
        },
      },
    },
  };
};
export default getTheme;
