import { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";

function App() {
  const initialValue = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async () => {
    console.log(`The data we are sending is ${JSON.stringify(user)}`);
    const response = await fetch("http://localhost:3000/api/submitUserData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await response.json();

    // const mainDiv = document.getElementById("main-div");

    // mainDiv?.appendChild(`<h1>This is my Response User: ${data.user}, Password: ${data.password}</>`);

    console.log(`The received object is `, data.user);
    console.log(`The received object is ${JSON.stringify(data.user)}`);
    // console.log(`The data received is: User: ${data.email}, Password: ${data.password}`);
  };

  return (
    <>
      <Header />
      <div id="main-div">
        <label htmlFor="">
          Email Address
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="">
          Password
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>

        <button onClick={handleClick}>Submit</button>
      </div>
      <Footer />
    </>
  );
}

export default App;
