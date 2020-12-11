import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/reducers";
import Actions from "../redux/actions";
import { AppBar, Toolbar, ButtonGroup, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();
  const authenticated = !!useSelector(selectUser);
  const darkTheme = false;
  return (
    <AppBar position="static" color="primary">
      <div className="container toolbar">
        <Toolbar>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={darkTheme} onChange={() => {}} aria-label="Theme switch" />}
              label={darkTheme ? 'Dark Theme' : 'Light Theme'}
            />
          </FormGroup>
          { authenticated ? (
              <Fragment>
                <div className="header-block">
                  <p>Hello Admin</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(Actions.auth.logout())}
                  >
                    Logout
                  </Button>
                </div>
              </Fragment>)
            : (<Fragment>
                <ButtonGroup variant="contained" color="primary">
                  <Button
                    className={`${window.location.href === '/login' ? 'active' : ''} header-link`}
                    onClick={() => {}}>
                    Login
                  </Button>
                </ButtonGroup>
              </Fragment>
            )}
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default React.memo(Header);
