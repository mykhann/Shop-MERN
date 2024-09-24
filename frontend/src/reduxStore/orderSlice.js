import { createSlice } from "@reduxjs/toolkit";
const orderSlice=createSlice({
    name:"order",
    initialState:{
        orders:[],
        singleOrder:null,
        orderHistory:[]
    },
    reducers:{
        setOrders:(state,action)=>{
            state.orders=action.payload
        },
        setSingleOrder:(state,action)=>{
            state.singleOrder=action.payload
        },
        setOrderHistory:(state,action)=>{
            state.orderHistory=action.payload
        }
       
    }
})

export const {setOrders,setSingleOrder,setOrderHistory}=orderSlice.actions
export default orderSlice.reducer