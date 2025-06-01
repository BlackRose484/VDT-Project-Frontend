export interface User {
  email: string;
  password: string;
  fullname: string;
  sex: string;
  address: string;
  phone: string;
  passport: string;
  date_of_birth: Date;
  role: Date;
  nums_booking_changed: number;
}


export interface UserProfileFormData {
  fullname: string;
  email: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}