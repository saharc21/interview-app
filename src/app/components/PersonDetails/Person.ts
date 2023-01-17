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
}
export interface UsersData {
  results: UserInfo[];
}
