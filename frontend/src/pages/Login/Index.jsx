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
} from "@mantine/core";
import { useContext, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import styles from "../Login/styles";
import {
  emailValidation,
  passwordValidation,
} from "./validations";
import { axiosPost } from "../../helpers/axiosHelper";
import { UserContext } from "../../contexts/UserContext";
const useStyles = createStyles((theme) => styles(theme));

export default function Register() {
  const { classes } = useStyles();
  const {setToken} = useContext(UserContext)
  //form containing all the input fields, and their validations
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => emailValidation(value),
      password: (value) => passwordValidation(value),
    }
  });
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function loginUser(values) {
    setIsLoading(true);
    try {
      const response = await axiosPost("/user/login", values);
      if (response) {
        localStorage.setItem("token", response);
        //setting token in context which triggers the setuser state in UserProvider
        setToken(response)
        navigate('/') 
      }      
    } catch (e) {
      //handling unknown errors
      console.log(e);
      showNotification({
        title: "Error",
        message: 'An unknown error occured. Please try again later.',
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={false} overlayBlur={2} />
      <Paper className={classes.form} radius={0} py={16} px={32}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={20}
        >
          Welcome to MovieHub!
        </Title>
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            mt="md"
            {...form.getInputProps("email")}
            withAsterisk
          />
          <PasswordInput
            label="Password"
            placeholder="Create Password"
            mt="md"
            {...form.getInputProps("password")}
            withAsterisk
          />
          <Button type="submit" fullWidth mt="xl" size="md" loading={isLoading} loaderPosition="center">
            Login
          </Button>
        </form>
        <Text align="center" mt="md">
          Don't have an account? <Link to="/auth/register" style={{color: theme.colors.yellow[6]}}>Register</Link>
        </Text>
      </Paper>
    </div>
  );
}
