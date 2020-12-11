import React from "react";
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { Status } from "../types/Base";

export const useLoader = (status: Status) => status === Status.Pending
  ? (
    <div className="loader-field">
      <Loader
        type="Puff"
        color="#fff"
        height={40}
        width={40}
      />
    </div>
  ) : null;
