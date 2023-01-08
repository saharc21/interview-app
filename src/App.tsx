import "./App.css";
import styled from "@emotion/styled";
import NavBar from "./components/NavBar";
import AnimatedRoutes from "./app/AnimatedRoutes";

const App = () => {
  return (
    <AppContainer className="App">
      <NavBar />
      <MainContentContainer>
        <AnimatedRoutes />
      </MainContentContainer>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContentContainer = styled.div`
  display: flex;
  height: 87vh;
  background-color: #e1f7fc;
  justify-content: center;
`;
