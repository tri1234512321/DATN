import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../components/Social/axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Register = () => {
  // const [inputs, setInputs] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   name: "",
  // });

  const history = useHistory();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    roleId: "",
    email: "",
    password:"",
    phoneNumber:"",
    
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (input) => {
      return makeRequest.post("/register", input);
    },
    {
      onSuccess: (data) => {
        // console.log(data);
        if(data.data.EC===0)
          history.push('/login');
        else 
          setErr(data.data.EM)
      },
      onError: (error) => {
        console.error("Registration error:", error);
        // Handle error state if needed
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    await mutation.mutate(inputs);
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
      <div className="left">
          <h1 className="text-3xl font font-semibold">Register</h1>
          <form className="form">
            <form class="form max-w-sm mx-0 ">
              <select id="role" name="roleId" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>Select Role</option>
                <option value="BUYER">Người mua</option>
                <option value="SHOP">Người bán</option>
                <option value="SHIPPER">Giao hàng</option>
              </select>
            </form>
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <input
              className="input"
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
            />
            {err && <p className="text-red-500 m-0">{err}</p>}
            <button className="button" onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className="right">
          <h1 className="h1">FFOOD</h1>
          <p className="p">
            Chào mừng bạn đến với chúng tôi 
          </p>
          <p className="p">
          Món ăn bạn muốn đang ở đây!
          </p>
          <span className="span">Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
