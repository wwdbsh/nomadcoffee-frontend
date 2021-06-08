import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "./routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $name: String
    $location: String
    $githubUsername:String
  ) {
    createAccount(
      username: $username
      email: $email
      password: $password
      name: $name
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
    const history = useHistory();
    const onCompleted = (data) => {
      const { username, password } = getValues();
      const {
        createAccount: { ok },
      } = data;
      if (!ok) {
        return;
      }
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
        password,
      });
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
      onCompleted,
    });
    const { register, handleSubmit, formState, getValues } = useForm({
      mode: "onChange",
    });
    const onSubmitValid = (data) => {
      if (loading) {
        return;
      }
      createAccount({
        variables: {
          ...data,
        },
      });
    };  
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faCoffee} size="3x" />
                    <Subtitle>
                        Sign up to be a member of us!
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                     ref={register({
                         required: "Username is required.",
                     })}
                     name="username"
                     type="text"
                     placeholder="Username"
                    />
                    <Input
                     ref={register({
                         required: "Email is required.",
                     })}
                     name="email"
                     type="text"
                     placeholder="Email"
                    />
                    <Input
                     ref={register({
                         required: "Password is required.",
                     })}
                     name="password"
                     type="password"
                     placeholder="Password"
                    />
                    <Input
                     ref={register}
                     name="name"
                     type="text"
                     placeholder="Name"
                    />
                    <Input
                     ref={register}
                     name="location"
                     type="text"
                     placeholder="Location"
                    />
                    <Input
                     ref={register}
                     name="githubUsername"
                     type="text"
                     placeholder="Github Username"
                    />
                    <Button
                     type="submit"
                     value={loading ? "Loading..." : "Sign up"}
                     disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
             cta="Have an account?"
             linkText="Log in"
             link={routes.home}
             />
        </AuthLayout>
    );
};

export default SignUp;