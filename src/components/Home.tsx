import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <HomeContainer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      “Experience is the name everyone gives to their mistakes...”
      {/* <img
        src="https://serving.photos.photobox.com/51265985f58799361618d9dbfdfda1a4b59bb98968fe48cdb7e2dfb372cfaf67cb1fb56e.jpg"
        alt="saharSelfie"
        width={250}
        style={{
          borderRadius: "10%",
          border: "solid 2px grey",
          boxShadow: "5px px 5px #ccc",
        }}
      /> */}
    </HomeContainer>
    // <PersonCard
    //   age="27"
    //   name="Sahar Cohen"
    //   thumbnail="https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg"
    // ></PersonCard>
  );
};

export default Home;

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: aliceblue;
  text-shadow: black 1px 0 4px;
  font-family: montserrat, san-serif;
  font-size: 35px;
`;
