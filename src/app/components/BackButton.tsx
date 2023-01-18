import { useHref, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common.styles";

interface Props {
  widthOfBtn: string;
}

const BackButton = ({ widthOfBtn }: Props) => {
  let history = useNavigate();
  return (
    <CustomButton style={{ width: widthOfBtn }} onClick={() => history(-1)}>
      Go back
    </CustomButton>
  );
};

export default BackButton;
