import { LoadingScreenContainer } from "./styles"
import Logo from '../../../assets/dark-logo.png'

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <img src={Logo} alt="logo" />
    </LoadingScreenContainer>
  )
}

export default LoadingScreen