export interface OpenSkyFlight {
  callsign: string,
  estArrivalAirport: string,
  estArrivalAirportHorizDistance: number,
  icao24: string,
  firstSeen: number, // time departure
  estDepartureAirport: string,
  lastSeen: number, // time arrival
  estDepartureAirportVertDistance: number,
  estDepartureAirportHorizDistance: number,
  estArrivalAirportVertDistance: number,
  departureAirportCandidatesCount: number,
  arrivalAirportCandidatesCount: number,
}
