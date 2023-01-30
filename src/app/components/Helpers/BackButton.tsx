import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common.styles";

interface ButtonStyle {
  width: string;
}

const BackButton = ({ width }: ButtonStyle) => {
  let history = useNavigate();
  return (
    <CustomButton style={{ width: width }} onClick={() => history(-1)}>
      Go back
    </CustomButton>
  );
};

export default BackButton;
