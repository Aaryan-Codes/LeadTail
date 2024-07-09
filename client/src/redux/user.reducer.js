import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        employees:[],
    },
    reducers:{
        setUser : (state,action)=>{
            state.user = action.payload;
        },
        setEmployees : (state,action)=>{
            state.employees.push(...action.payload);
        },
        updateEmployees :(state,action)=>{
            state.employees = action.payload;
        }
    }
})

export const {setUser,setEmployees,updateEmployees} = userSlice.actions;
export default userSlice.reducer;