import { CustomText } from "../../common.styles";
import { AboutMeText, AboutMeTitle } from "../utils";
import { AboutMeContainer, AboutMeContent } from "./AboutMe.styled";

const AboutMe = () => {
  return (
    <AboutMeContainer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <CustomText
        id="about-me-title"
        weight="600"
        color="red"
        textShadow="gray 1px 0 5px"
      >
        {AboutMeTitle}
      </CustomText>
      <AboutMeContent id="about-me-content">{AboutMeText}</AboutMeContent>
    </AboutMeContainer>
  );
};

export default AboutMe;
