import { axiosInstance } from ".";

// Get all the leads
export const GetAllLeads = async () => {
  try {
    const response = await axiosInstance.get("/api/leads/get-all-leads");
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get leads for specific company
export const GetCompanyLeads = async (payload) => {
  try {
    const response = await axiosInstance.get(
      "/api/leads/get-company-leads",
      payload
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

// Add new lead
export const AddLead = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/leads/add-lead", payload);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update existing lead
export const UpdateLead = async (payload) => {
  try {
    const response = await axiosInstance.put("/api/leads/update-lead", payload);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete lead
export const DeleteLead = async (payload) => {
  try {
    // console.log(payload);
    console.log(payload);
    const response = await axiosInstance.put("/api/leads/delete-lead", payload);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
