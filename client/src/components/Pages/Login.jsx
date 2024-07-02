import { useEffect, useState } from "react";
import { GiFoxTail } from "react-icons/gi";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../API/userAPIcalls";

const Login = () => {
  
  const navigate = useNavigate();

  const handleLogin = async (value) => {
    try {
      const response = await LoginUser(value);
      if(response.success){
        message.success(response.message);
        localStorage.setItem('token',response.token);
        navigate('/');
      }else{
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[]);

  return (
    <div className="flex justify-center h-[95vh] items-center">
      <h1 className="absolute top-3 left-4 text-2xl font-semibold flex items-center justify-center">
        LeadTail <GiFoxTail />
      </h1>

      <div className="flex flex-col gap-3 justify-center items-center px-10 py-10 rounded-xl shadow-xl w-[460px]">
        <div className="text-lg flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold flex items-center justify-center">
            Welcome back!
          </h1>
          <h2 className="text-gray-600">One platform to streamline workflow</h2>
        </div>
        <Form
          layout="vertical"
          className="flex flex-col gap-0 w-[100%]"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            label="Email"
            className="d-block"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" name="email" placeholder="Please enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            className="d-block"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              type="password"
              name="password"
              placeholder="Please enter your password"
            />
          </Form.Item>
          <button
            type="submit"
            className="bg-black text-white px-1 py-2 rounded-md"
          >
            Login
          </button>
          <div>
            <p className="text-center mt-2">
              Don't have an account yet?{" "}
              <Link to="/register">
                <u>Register</u>
              </Link>{" "}
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
