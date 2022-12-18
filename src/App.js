import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RoutesPath from "./routes/RoutesPath";
import Navbar from "./components/Navbar/Navbar";
import Mnavbar from "./components/Mobile/Mnavbar/Mnavbar";
import styled from "styled-components";
import useProfileStore from "./store/store.js";

// create a styled component for the main content
const MainContent = styled.main`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


function App() {
  
  const profile = useProfileStore((state) => state.profile);

  

  return (
    <BrowserRouter>
      <MainContent>
        <ToastContainer autoClose={2000} />
        <Navbar />
        <RoutesPath />
        {
          profile.name !== "Guest" ? <Mnavbar /> : null
        }
      </MainContent>
    </BrowserRouter>
  );
}

export default App;
