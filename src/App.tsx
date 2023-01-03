import "./App.css";
import styled from "@emotion/styled";
import NavBar from "./components/NavBar";
import AnimatedRoutes from "./app/AnimatedRoutes";

const App: React.FC = () => {
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
  // align-items: center;
`;

const MainContentContainer = styled.div`
  display: flex;
  height: 87vh;
  background-color: #e1f7fc;
  justify-content: center;
  // align-items: center;
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "100%",
  // backgroundPosition: "center",
`;

// backgroundImage: `url  ("https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg")`,
