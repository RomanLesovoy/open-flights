import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import ErrorBoundary from "../HOC/ErrorBoundary";
import { useLoader } from "../hooks/Loader";
import Actions from "../redux/actions";
import { selectOpenSkyStatus, selectOpenSkyError, selectOpenSkyFlights } from "../redux/reducers";
import { daysInMilliseconds, minutesInMilliseconds, fromUnixToISO } from "../helpers/date";
import { OpenSkyFlight } from "../types/OpenSky";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pickedDate, setPickedDate] = useState(new Date());
  const requestErrored = useSelector(selectOpenSkyError);
  const getFlightsNextMinutes = (minutes: number = 15) => dispatch(
    Actions.openSky.getFlights(
      new Date(pickedDate).getTime(),
      new Date(pickedDate).getTime() + minutesInMilliseconds(minutes),
    ),
  );

  const renderFilter = () => (
    <div className="filters">
      <p>
        Choose next 15 minutes of flights<br />(request can take a while)
      </p>
      <div className="search">
        <DatePicker
          showYearDropdown
          onChange={(date: Date) => setPickedDate(date)}
          showTimeInput
          selected={pickedDate}
          minDate={new Date('01/01/1999')}
          maxDate={new Date(new Date().getTime() + daysInMilliseconds(365))}
          timeFormat="HH:mm"
          timeInputLabel="Time:"
          dateFormat="yyyy MMMM dd, h:mm"
        />
        <Button
          type="submit"
          className="form-submit"
          variant="contained"
          onClick={() => getFlightsNextMinutes()}
          color="primary"
        >
          Search
        </Button>
      </div>
      <div className="form-errors">
        <p>{ requestErrored }</p>
      </div>
    </div>
  );

  const renderTable = (flights: Array<OpenSkyFlight> = []) => {
    return (
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Airport</TableCell>
              <TableCell>Arriving</TableCell>
              <TableCell>Departing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight: OpenSkyFlight) => (
              <TableRow key={`${flight.icao24}`}>
                <TableCell>{ flight.estDepartureAirport || flight.estArrivalAirport || '-' }</TableCell>
                <TableCell>{ fromUnixToISO(flight.lastSeen) }</TableCell>
                <TableCell>{ fromUnixToISO(flight.firstSeen) }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Paper>
      <div className="dashboard">
        <ErrorBoundary>
          { useLoader(useSelector(selectOpenSkyStatus)) }
          { renderFilter() }
          { renderTable(useSelector(selectOpenSkyFlights)) }
        </ErrorBoundary>
      </div>
    </Paper>
  );
}

export default React.memo(Dashboard);
