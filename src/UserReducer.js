import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create action for Fetch Data from the API EndPoint
export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const result = await axios.get("https://jsonplaceholder.typicode.com/users");
  return result.data;
});

// Create action for create new user
export const addNewUser = createAsyncThunk("createUsers", async (data) => {
  console.log("data", data);
  const result = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    data
  );
  console.log(result);
  return result;
});

// Create Action for Update User Data
export const updateUserData = createAsyncThunk(
  "updateUserData",
  async (data) => {
    const result = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${data.id}`,
      data
    );
    console.log(result);
    return result;
  }
);

// Action for Delete User
export const deleteUser = createAsyncThunk("deleteUsers", async (id) => {
  const result = await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  // console.log(result);
  return result;
});

// All users Table SLice
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = true;
    });

    // Handle New User
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Handle Update User
    builder.addCase(updateUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Handle Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;

      console.log(action.payload);

      // Delete User Logic
      // const { id } = action.payload;

      // if (id) {
      //   state.data = state.data.filter((user) => user.id !== id);
      // }
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
