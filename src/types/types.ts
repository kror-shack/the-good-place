export interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
  isAdmin: boolean;
}

export type SignUpForm = {
  email: undefined | string;
  password: undefined | string;
  username: undefined | string;
  firstName: undefined | string;
  lastName: undefined | string;
};

export type ReviewData = {
  author: string;
  date: string;
  content: string;
  header: string;
  authorPhotoUrl: string;
  stars: number;
};

export type ReservationData = {
  name: string;
  time: string;
  people: number;
  request: number;
  email: string;
  number: number;
  date: string;
};

export type AddressData = {
  addressLineOne: string;
  district: string;
  city: string;
  addressLineTwo: string;
};
