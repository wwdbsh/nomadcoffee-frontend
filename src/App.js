import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isLoggedInVar, darkModeVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? (
              <Home />
            ) : (
              <Login />
            )}
          </Route>
          {/* <Redirect path="/"/> */}
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
