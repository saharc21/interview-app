export interface UserName {
  first: string;
  last: string;
  title?: string;
}
export interface Picture {
  thumbnail: string;
}
export interface DateDetails {
  date: string;
  age: number;
}
export interface UserInfo {
  name: UserName;
  picture: Picture;
  dob: DateDetails;
  gender: Gender;
}
export interface UsersData {
  results: UserInfo[];
}

export interface PersonCardDetails {
  age?: string;
  name?: string;
  thumbnail?: string;
}

export enum Gender {
  FemaleDescription = "Female",
  FemaleCode = "female",
  MaleDescription = "Male",
  MaleCode = "male",
  AllDescription = "All",
  AllCode = "all",
  OtherCode = "other",
  OtherDescription = "Other",
  Undefined = "undefined",
}
