import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <HomeContainer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      “Experience is the name everyone gives to their mistakes...”
    </HomeContainer>
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
