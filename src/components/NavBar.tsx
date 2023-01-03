import styled from "@emotion/styled";
import { CustomAvatarImg, CustomLink, CustomText } from "../app/common";

const Links = () => (
  <LinksSection>
    <CustomLink to="/">Home</CustomLink>
    <CustomLink to="/about">Who am I?</CustomLink>
    <CustomLink to="/my-portfolio">My Portfolio</CustomLink>
  </LinksSection>
);

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomAvatarImg
          src="https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg"
          alt="Sahar"
          sizeOfAvatar={80}
          style={{ marginRight: "15px", marginLeft: "30px" }}
        />
        <CustomText fontFamily="'Montserrat', sans-serif" fontSize={35}>
          Sahar Cohen
        </CustomText>
      </div>
      <Links />
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 13vh;
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin-right: 200px;
`;
