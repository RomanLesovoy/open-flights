import React, { useState } from "react";
import ErrorBoundary from "../HOC/ErrorBoundary";
import { selectAuthError, selectAuthStatus } from "../redux/reducers";
import { TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";

import { useLoader } from "../hooks/Loader";
import Actions from "../redux/actions"

const Login = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (event: any) => {
    event.preventDefault();
    dispatch(Actions.auth.signIn({ login, password }))
  }
  return (
    <Paper>
      <ErrorBoundary>
        { useLoader(useSelector(selectAuthStatus)) }
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="login-form">
          <form>
            <div className="form-field">
              <label htmlFor="field-email">
                <TextField
                  type="text"
                  placeholder="Login"
                  className="form-control"
                  color="primary"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                />
              </label>
            </div>
            <div className="form-field">
              <label htmlFor="field-email">
                <TextField
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  color="primary"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>
            <div className="form-field">
              <Button
                type="submit"
                className="form-submit"
                disabled={!login || !password}
                onClick={signIn}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
            <div className="form-errors">
              <p>{ authError }</p>
            </div>
          </form>
        </div>
      </ErrorBoundary>
    </Paper>
  );
}

export default React.memo(Login);
