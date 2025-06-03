export interface UserCardProps {
  // all of these properties can be undefined
  _id?: string;
  email: string;
  fullname?: string;
  sex?: string;
  address?: string;
  phone?: string;
  passport?: string;
  date_of_birth?: Date;
  role?: string;
}
