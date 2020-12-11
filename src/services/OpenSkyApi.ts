import BaseApi from "./BaseApi";
import { minutesInMilliseconds, toUnix, daysInMilliseconds } from "../helpers/date";

export default class OpenSkyApi extends BaseApi {
  getFlights = async (
    begin: number = Date.now() - daysInMilliseconds(465),
    end: number = Date.now() - daysInMilliseconds(465) + minutesInMilliseconds(20),
  ) => {
    const toStringAndUnix = (timestamp: number) => String(toUnix(timestamp));
    const route = `https://opensky-network.org/api/flights/all?begin=${toStringAndUnix(begin)}&end=${toStringAndUnix(end)}`;
    return this.createRequest(null, route, "get");
  }
}
