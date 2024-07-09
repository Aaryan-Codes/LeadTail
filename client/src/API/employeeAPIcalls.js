import { axiosInstance } from ".";

export const AddNewEmployee = async (payload) =>{
    try {
        const response = await axiosInstance.post('/api/employees/add-employee',payload);
        console.log(response.data);
        return response.data
    } catch (error) {
        return error.message;
    }

}

export const GetEmployeeByCompany = async () =>{
    try {
        const response = await axiosInstance.get('/api/employees/get-employees-by-company');
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetAllEmployees = async () =>{
    try {
        const response = await axiosInstance.get('/api/employees/get-all-employees');
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const DeleteEmployee = async (payload) =>{
    try {
        const response = await axiosInstance.put('/api/employees/delete-employee',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const UpdateEmployee = async(payload) =>{
    try {
        const response = await axiosInstance.put('/api/employees/update-employee',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}