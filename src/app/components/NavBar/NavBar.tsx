import { CustomAvatarImg, CustomText } from "../../common.styles";
import { SaharAvatarImage } from "../utils";
import { Links } from "./Links";
import { NavBarContainer, TitleSection } from "./NavBar.styled";


const NavBar = () => (
  <NavBarContainer>
    <TitleSection>
      <CustomAvatarImg
        src={SaharAvatarImage}
        alt="Sahar"
        sizeOfAvatar={80}
        style={{ marginRight: "15px" }}
      />
      <CustomText fontSize={35}>Sahar Cohen</CustomText>
    </TitleSection>
    <Links />
  </NavBarContainer>
);

export default NavBar;

