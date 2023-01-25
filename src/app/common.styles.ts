import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const CustomButton = styled.button`
  color: white;
  background-color: #159cd8;
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
  text-decoration: none;
`;

export const CustomText = styled.label<{
  color?: string;
  weight?: string;
  fontSize?: number;
  textShadow?: string;
}>`
  color: ${({ color }) => (color ? color : "black")};
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "auto")};
  text-shadow: ${({ textShadow }) => (textShadow ? textShadow : "")};
`;

export const CustomAvatarImg = styled.img<{ sizeOfAvatar: number }>`
  width: ${({ sizeOfAvatar }) => (sizeOfAvatar ? sizeOfAvatar : 150) + "px"};
  border: 2px solid grey;
  box-shadow: 0px 6px 5px #ccc;
  -webkit-box-shadow: 0px 6px 5px #ccc;
  -moz-box-shadow: 0px 6px 5px #ccc;
  border-radius: 190px;
  -webkit-border-radius: 190px;
  -moz-border-radius: 190px;
`;

export const CustomAvatarIcon = styled.img<{ sizeOfAvatar: number }>`
  width: ${({ sizeOfAvatar }) => (sizeOfAvatar ? sizeOfAvatar : 150) + "px"};
  border: 1px solid black;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0px 3px 10px #ccc;
  -webkit-box-shadow: 0px 3px 10px #ccc;
  -moz-box-shadow: 0px 3px 10px #ccc;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  width: 300px;
  height: 50px;
  margin: 20px;
  background-color: white;
  border: solid 1px black;
  border-radius: 20px;
`;
