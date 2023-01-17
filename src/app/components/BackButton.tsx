import { useHref, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common.styles";
const BackButton = () => {
  let history = useNavigate();
  return <CustomButton onClick={() => history(-1)}>Go back</CustomButton>;
};

export default BackButton;
