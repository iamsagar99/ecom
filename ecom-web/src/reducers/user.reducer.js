import {createSlice} from '@reduxjs/toolkit';

const initialState  = {
    userDetail: {}
}

export const UserSlicer = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUserDetail: (state,action)=>{
            console.log("state:",state)
            console.log("action:",action);
            state.userDetail=action.payload;
        },
        getUserDetail: (state) => {
            return state.userDetail;
        }
    }
})

export const {setUserDetail,getUserDetail} = UserSlicer.actions;
export default UserSlicer.reducer;