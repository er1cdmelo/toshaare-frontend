import { LoadingContainer, Loader } from "./styles"
// import a loading icon from react-icons
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <LoadingContainer>
        <FaSpinner />
    </LoadingContainer>
  )
}

export default Loading