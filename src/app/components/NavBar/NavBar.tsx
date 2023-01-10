import styled from "@emotion/styled";
import { CustomAvatarImg, CustomText } from "../../common.styles";
import { Links } from "./Links";

// Fix - div with styles to styles, first div in NavBarContainer.

const NavBar = () => (
  <NavBarContainer>
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Fix - src to common utils file, maybe on app folder. (because its hardcoded we want it in other file to look better) */}
      <CustomAvatarImg
        src="https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg"
        alt="Sahar"
        sizeOfAvatar={80}
        style={{ marginRight: "15px" }}
      />
      <CustomText fontSize={35}>Sahar Cohen</CustomText>
    </div>
    <Links />
  </NavBarContainer>
);

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  align-items: center;
  height: 13vh;
`;
