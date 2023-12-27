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
import { useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import styles from "../Login/styles";
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} from "./validations";
import { axiosPost } from "../../helpers/axiosHelper";
const useStyles = createStyles((theme) => styles(theme));

export default function Register() {
  const { classes } = useStyles();
  //form containing all the input fields, and their validations
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) => nameValidation(value),
      lastName: (value) => nameValidation(value),
      email: (value) => emailValidation(value),
      password: (value) => passwordValidation(value),
      confirmPassword: (value, values) =>
        confirmPasswordValidation(value, values.password),
    },
  });
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function registerUser(values) {
    setIsLoading(true);
    try {
      const response = await axiosPost("/user/register", values);
      if (response) navigate('/auth/login')       
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
        <form onSubmit={form.onSubmit((values) => registerUser(values))}>
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps("firstName")}
            withAsterisk
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            mt="md"
            {...form.getInputProps("lastName")}
            withAsterisk
          />
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter Password"
            mt="md"
            {...form.getInputProps("confirmPassword")}
            withAsterisk
          />
          <Button type="submit" fullWidth mt="xl" size="md" loading={isLoading} loaderPosition="center">
            Register
          </Button>
        </form>
        <Text align="center" mt="md">
          Already have an account? <Link to="/auth/login" style={{color: theme.colors.yellow[6]}}>Login</Link>
        </Text>
      </Paper>
    </div>
  );
}
