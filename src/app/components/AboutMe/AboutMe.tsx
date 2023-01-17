import { CustomText } from "../../common.styles";
import { AboutMeText, AboutMeTitle } from "../utils";
import { useEffect } from "react";
import { AboutMeContainer, AboutMeContent } from "./AboutMe.styled";

const AboutMe = () => {
  useEffect(() => {
    const titleSection = document.getElementById("about-me-title");
    if (titleSection !== null) {
      titleSection.innerHTML = AboutMeTitle;
    }
    const contentSection = document.getElementById("about-me-content");
    if (contentSection !== null) {
      contentSection.innerHTML = AboutMeText;
    }
  }, []);

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
      ></CustomText>
      <AboutMeContent id="about-me-content"></AboutMeContent>
    </AboutMeContainer>
  );
};

export default AboutMe;
