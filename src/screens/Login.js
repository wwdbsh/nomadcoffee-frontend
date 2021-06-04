import { useState } from "react";
import styled, { css } from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
    color:${(props) => props.theme.fontColor}
`;

const Container = styled.div``;

const Button = styled.button``;

const Login = () => {
    return (
        <Container>
            <Title>Login</Title>
            <Button onClick={() => darkModeVar(true)}>To dark</Button>
            <Button onClick={() => darkModeVar(false)}>To light</Button>
            <Button onClick={() => isLoggedInVar(true)}>Log in now!</Button>
        </Container>
    );
};

export default Login;