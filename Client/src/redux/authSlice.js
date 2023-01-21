import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../apis/userAuth'

const initialValues =  {
    msg:'',
    user:JSON.parse(localStorage.getItem('user')),
    loading:false,
    error:''
} 
let initialState;

if(initialValues.user !== null){
    initialState = initialValues
}else{
    initialState ={
        msg:'',
        user:{},
        loading:false,
        error:''
    }
}

export const loginUser = createAsyncThunk('loginUser',async(data)=>{
    const res = await login(data)
    const {headers,config,request, ...rest} = res;
    return rest
})



const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout: (state,action) =>{
            state.user = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload: { data} }) => {
                state.loading = false;
                if (data.error) {
                    console.log('innn err redux');
                    state.error = data.error;
                } else {
                    console.log('inn else eedde');
                    state.msg = data.msg;
                    state.user = data.user;
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;   
            });
    },
});


export const {addToken,logout} = authSlice.actions
export default authSlice.reducer;