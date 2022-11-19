import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Container } from "./styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import a warning icon from react-icons
import { RiErrorWarningLine } from "react-icons/ri";
// import a success icon from react-icons
import { RiCheckLine } from "react-icons/ri";
import { useEffect } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [userAvaible, setUserAvaible] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        console.log(data);
      });
  }, []);

  const addUser = async (user) => {
    const token = user && (await user.getIdToken());
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: name,
        username: username,
        picture:
          user.photoURL ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      }),
      headers: {
        "Content-Type": "application/json",
        authToken: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // create a function to handle the submit
  const register = (e) => {
    e.preventDefault();

    // create a username validation
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (!userAvaible) {
      toast.error("Username is not avaible");
      return;
    }

    // create a password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    const message = toast.loading("Creating account...");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addUser(user);

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        }).catch((error) => console.log(error.message));

        toast.dismiss(message);
        toast.success("Account created successfully!", { autoClose: 1000 });

        setTimeout(() => {
          navigate("/");
        }, 1000);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message
          .substring(error.message.indexOf("(") + 1, error.message.indexOf(")"))
          .replaceAll("-", " ");
        toast.update(message, {
          render: "ERROR: " + errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        // ..
      });
  };

  return (
    <Container>
      <form action="#" onSubmit={register}>
        <h1>Sign Up</h1>
        <label htmlFor="name">Name</label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="name"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setUserAvaible(
                allUsers.every((user) => user.username !== e.target.value)
              );
            }, 2000);
          }}
        />
        {username.length >= 3 ? (
          loading ? (
            <p>Checking avaibility...</p>
          ) : userAvaible ? (
            <p className="avaible">
              <RiCheckLine />
              Username is avaible
            </p>
          ) : (
            <p className="unvaible">
              <RiErrorWarningLine />
              Username is not avaible
            </p>
          )
        ) : null}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="cpassword">Confirm your password</label>
        <input
          type="password"
          id="cpassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword.length >= password.length &&
          password !== confirmPassword && (
            <p className="error">
              <RiErrorWarningLine />
              Passwords do not match
            </p>
          )}
        <button type="submit">Sign Up</button>
        <Link to="/signin">Already have an account</Link>
      </form>
    </Container>
  );
};

export default SignUp;
