import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RoutesPath from "./routes/RoutesPath";
import Navbar from "./components/Navbar/Navbar";
import styled from "styled-components";

// create a styled component for the main content
const MainContent = styled.main`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Router>
      <MainContent>
        <ToastContainer autoClose={2000} />
        <Navbar />
        <RoutesPath />
      </MainContent>
    </Router>
  );
}

export default App;
