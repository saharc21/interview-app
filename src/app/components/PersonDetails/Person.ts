export interface UserName {
  first: string;
  last: string;
  title?: string;
}
export interface PicProps {
  thumbnail: string;
}
export interface DateDetails {
  date: string;
  age: number;
}
export interface UserInfo {
  name: UserName;
  picture: PicProps;
  dob: DateDetails;
  gender: Gender.MaleCode | Gender.FemaleCode;
}
export interface UsersData {
  results: UserInfo[];
}

export enum Gender {
  FemaleDescription = "Female",
  FemaleCode = "female",
  MaleDescription = "Male",
  MaleCode = "male",
  AllDescription = "All",
  AllCode = "all",
}
