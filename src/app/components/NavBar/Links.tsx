import styled from "@emotion/styled";
import { CustomLink } from "../../common.styles";

// Fix - Use Enum (already have that) for the links.

export const Links = () => (
  <LinksSection>
    <CustomLink to="/">Home</CustomLink>
    <CustomLink to="/about">Who am I?</CustomLink>
    <CustomLink to="/my-portfolio">My Portfolio</CustomLink>
  </LinksSection>
);

const LinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;
