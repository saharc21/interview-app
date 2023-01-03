import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export enum RoutePaths {
  Home = "/",
  AboutMe = "/about",
  MyPortfolio = "/my-portfolio",
  CounterByHooks = "/my-portfolio/counter",
  CounterByRedux = "/my-portfolio/counter-with-redux",
  FetchDataByAxios = "/my-portfolio/person-details",
}

export const CustomButton = styled.button`
  color: white;
  background-color: #159cd8;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  border-radius: 20px;
  border: solid 1px black;
`;

export const CustomInput = styled.input`
  border: solid 1px black;
  border-radius: 20px;
  text-align: center;
`;

export const CustomLink = styled(Link)`
  color: grey;
  text-shadow: grey 1px 0 5px;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
`;

export const CustomText = styled.label<{
  color?: string;
  weight?: string;
  fontFamily?: string;
  fontSize?: number;
}>`
  color: ${({ color }) => (color ? color : "black")};
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : "italic")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "auto")};
`;

export const CustomAvatarImg = styled.img<{ sizeOfAvatar: number }>`
  width: ${({ sizeOfAvatar }) =>
    sizeOfAvatar ? sizeOfAvatar + "px" : "150px"};
  border: 2px solid grey;
  background: url(img/duck.png) no-repeat;
  -moz-box-shadow: 0px 6px 5px #ccc;
  -webkit-box-shadow: 0px 6px 5px #ccc;
  box-shadow: 0px 6px 5px #ccc;
  -moz-border-radius: 190px;
  -webkit-border-radius: 190px;
  border-radius: 190px;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 300px;
  margin: 20px;
  background-color: white;
  border: solid 1px black;
  border-radius: 20px;
`;
