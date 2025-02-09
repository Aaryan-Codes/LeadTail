import { axiosInstance } from ".";

export const RegisterUser = async (value) => {
    try {
      const response = await axiosInstance.post("api/users/signup", value);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const LoginUser = async(value)=>{
    try {
        const response = await axiosInstance.post('api/users/login',value);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const GetCurrentUser = async()=>{
  try {
    const response = await axiosInstance.get('api/users/get-current-user');
    return response.data;
  } catch (error) {
    return error.response;
  }
}