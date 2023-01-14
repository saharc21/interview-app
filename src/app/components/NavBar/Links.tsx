import styled from "@emotion/styled";
import { CustomLink } from "../../common.styles";
import { RoutePaths } from "../../routes/Routes";

export const Links = () => (
  <LinksSection>
    <CustomLink to={RoutePaths.Home}>Home</CustomLink>
    <CustomLink to={RoutePaths.AboutMe}>Who am I?</CustomLink>
    <CustomLink to={RoutePaths.MyPortfolio}>My Portfolio</CustomLink>
  </LinksSection>
);

const LinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;
