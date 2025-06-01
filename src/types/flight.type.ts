export interface Flight {
  _id: string;
  aircraft_id: string;
  number: string;
  ori_airport: string;
  des_airport: string;
  scheduled_departure: Date;
  scheduled_arrival: Date;
  actual_departure: Date;
  actual_arrival: Date;
  nums_busi_seat_avail: number;
  nums_eco_seat_avail: number;
  base_price: number;
  revenue: number;
}

export type Flights = Flight[];

export interface Airport {
  _id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export type Airports = Airport[];

export interface Ticket {
  dob: Date | null;
  name: string;
  nationality: string;
  email: string;
  phone: string;
  passport: string;
  price: number;
}

export type Tickets = Ticket[];

export interface Aircraft {
  _id: string;
  name: string;
  user_id: string;
  code: string;
  manufacturer: string;
  model: string;
  manufactured_year: number;
  nums_seat: number;
  total_revenue: number;
  last_updated: Date;
}

export type Aircrafts = Aircraft[];

export interface PopularPlace {
  city: string;
  booked_seat: number;
  cheapest_price: number;
  country: string;
}

export type PopularPlaces = PopularPlace[];

export interface BookingProps {
  bookingId: string;
  flightId: string;
  bookingDate: string;
  status: string;
  departureCityCode: string;
  destinationCityCode: string;
  departureCityName: string;
  destinationCityName: string;
  departureTime: string;
  departureTimeOld: string;
  arrivalTime?: string;
  arrivalTimeOld?: string;
  businessTickets: number;
  economyTickets: number;
  totalPrice: number;
  cancelAvailableUntil: string;
}

export type Bookings = BookingProps[];
