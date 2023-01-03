import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  CustomLink,
  CustomText,
  ListItemContainer,
  RoutePaths,
} from "../app/common";

const MyPortfolio: React.FC = () => {
  return (
    <PortfolioContainer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <CustomText fontFamily="montserrat,san-serif" fontSize={30} color="black">
        Welcome to my Gameplay :)
      </CustomText>
      <CustomText
        fontFamily="montserrat,san-serif"
        fontSize={20}
        weight="600"
        color="grey"
      >
        A little bit about my expirence in some simple tasks{" "}
      </CustomText>
      <SubProjectsArea>
        <ListItemContainer>
          <CustomLink to={RoutePaths.CounterByHooks}>
            Manual and Auto Counter by Hooks
          </CustomLink>
        </ListItemContainer>
        <ListItemContainer>
          <CustomLink to={RoutePaths.CounterByRedux}>
            Counter with global state by Redux
          </CustomLink>
        </ListItemContainer>
        <ListItemContainer>
          <CustomLink to={RoutePaths.FetchDataByAxios}>
            Fetch API - persons details data by axios
          </CustomLink>
        </ListItemContainer>
      </SubProjectsArea>
    </PortfolioContainer>
  );
};

export default MyPortfolio;

const PortfolioContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: start;
  margin-top: 20px;
`;
const SubProjectsArea = styled.div`
  display: flex;
  margin-top: 200px;
`;
