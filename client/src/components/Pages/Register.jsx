import { useState,useEffect } from "react";
import { GiFoxTail } from "react-icons/gi";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../API/userAPIcalls";

const Register = () => {
  
  const navigate = useNavigate();

  const handleRegister = async (value) => {
    try {
      const res = await RegisterUser(value);
      if(res.success){
        message.success(res.message);
        message.success("Verification email sent, check your mail!")
      }else{
        message.error(res.message);
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
            Register to LeadTail
          </h1>
          <h2 className="text-gray-600">One platform to streamline workflow</h2>
        </div>
        <Form
          layout="vertical"
          className="flex flex-col gap-0 w-[100%]"
          onFinish={handleRegister}
        >
          <Form.Item
            name="name"
            label="Name"
            className="d-block"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input type="text" id="name" placeholder="Enter your name"></Input>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Contact No."
            className="d-block"
            rules={[{ required: true, message: "Contact No. is required" }]}
          >
            <Input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
            />
          </Form.Item>
          <Form.Item
            name="companyName"
            label="Company"
            className="d-block"
            rules={[{ required: true, message: "Company name is required" }]}
          >
            <Input
              type="text"
              name="companyName"
              placeholder="Enter company name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            className="d-block"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" name="email" placeholder="Enter your email" />
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
              placeholder="Password must be 6+ characters"
            />
          </Form.Item>
          <button
            type="submit"
            className="bg-black text-white px-1 py-2 rounded-md"
          >
            Signup
          </button>
          <div>
            <p className="text-center mt-2">
              Already a user?{" "}
              <Link to="/login">
                <u>Login now</u>
              </Link>{" "}
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
