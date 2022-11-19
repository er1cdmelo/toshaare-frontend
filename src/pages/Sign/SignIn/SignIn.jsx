import { Container } from "./styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const login = async (e) => {
    e.preventDefault();
    const message = toast.loading("Logging in...", { autoClose: false });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        toast.dismiss(message);
        toast.success("Logged in successfully!", { autoClose: 1000 });
        navigate("/");
        }, 1000);
      
    } catch (error) {
      console.log('Deu erro')
      const errorMessage = error.message.substring(error.message.indexOf('(') + 1, error.message.indexOf(')')).replaceAll('-', ' ');
      toast.dismiss(message);
      toast.error(errorMessage, { autoClose: 2000 });
    }
  };

  return (
    <Container>
      <form action="#" onSubmit={login}>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <Link to="/signup">Create account</Link>
      </form>
    </Container>
  );
};

export default SignIn;
