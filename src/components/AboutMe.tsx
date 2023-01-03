// interface AboutMeProps {
//   name?: string;
//   age?: number;
// }

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CustomAvatarImg } from "../app/common";

const AboutMe: React.FC = () => {
  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* <CustomAvatarImg
        src="https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg"
        alt="Sahar"
      /> */}
      <p
        style={{
          fontWeight: 600,
          color: "aliceblue",
          textShadow: "black 1px 0 5px",
        }}
      >
        So who am I ?
      </p>
      <p
        style={{
          color: "aliceblue",
          textShadow: "black 1px 0 4px",
          //   maxWidth: "1000px",
        }}
      >
        I'm Sahar Cohen, a passionate software engineer. My mainly profession is
        Front-End developing.
        <br /> Many people aske me: "Sahar, why didn't you decide to go a
        different subject in the whole software world?, Where does the desire
        for FE come from?"
        <br /> To be honest, I love to see things in my eyes, UI developing and
        implemention is the best way to get indication about your writing code.
        <br />
        As a FE developer, I develop my projects with some new and popular
        technologics. Start with React, the most popular library of one single
        page application developing with TypeScript.
        <br /> TypeScript is the best practice we can develop website in a right
        way to prevent bugs and broken values before executing the app. Makes
        our debugging better.
        <br /> In addition, using styled components library to make the app
        style more simpler and clear. With React I mange my states by Hooks for
        local components state and Redux/Mobx for global states who appear and
        affected in many components in our app tree.
      </p>
    </motion.div>
  );
};

export default AboutMe;
