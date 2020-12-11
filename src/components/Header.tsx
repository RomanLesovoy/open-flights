import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/reducers";
import Actions from "../redux/actions";
import { AppBar, Toolbar, ButtonGroup, Button } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();
  const authenticated = !!useSelector(selectUser);

  return (
    <AppBar position="static" color="primary">
      <div className="container toolbar">
        <Toolbar>
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
                <ButtonGroup variant="contained" color="default">
                  <Button>
                    <NavLink to="/login">Login</NavLink>
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
