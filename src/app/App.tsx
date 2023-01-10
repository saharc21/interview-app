import "./App.css";
import styled from "@emotion/styled";
import NavBar from "./components/NavBar/NavBar";
import AnimatedRoutes from "./routes/Routes";

const App = () => {
  return (
    <AppContainer>
      <NavBar />
      <MainContentContainer>
        <AnimatedRoutes />
      </MainContentContainer>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const MainContentContainer = styled.div`
  display: flex;
  padding: 0 50px;
  height: 87vh;
  background-color: #e1f7fc;
  justify-content: center;
`;
