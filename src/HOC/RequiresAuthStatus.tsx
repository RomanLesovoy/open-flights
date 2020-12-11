import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectAuthStatus } from "../redux/reducers";

interface Props {
  path: any;
  component: any;
  exact: any;
  authStatus: string;
  notStatus?: string;
  onlyStatus?: string;
  redirectUrl: string;
}

class RequiresAuthStatus extends React.PureComponent<Props> {
  render() {
    const {
      component: Component,
      authStatus,
      notStatus = '',
      onlyStatus = '',
      redirectUrl,
      ...rest
    } = this.props;

    if (
      (notStatus && authStatus === notStatus)
      || (onlyStatus && authStatus !== onlyStatus)
    ) {
      return <Redirect to={redirectUrl} />
    }

    return (
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  authStatus: selectAuthStatus(state),
});

export default connect(mapStateToProps)(RequiresAuthStatus);
