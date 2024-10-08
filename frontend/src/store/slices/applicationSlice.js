/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    requestForAllApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForAcceptApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForAcceptApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForAcceptApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForRejectApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForRejectApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForRejectApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.applications = state.applications;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
  },
});

export const acceptApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAcceptApplication());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/application/accept/${id}`,
      {},
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForAcceptApplication(
        response.data.message
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAcceptApplication(
        error.response.data.message
      )
    );
  }
};

export const rejectApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForRejectApplication());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/application/reject/${id}`,
      {},
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForRejectApplication(
        response.data.message
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForRejectApplication(
        error.response.data.message
      )
    );
  }
};

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/employer/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response.data.message
      )
    );
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/jobseeker/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplications(
        error.response.data.message
      )
    );
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(clearAllApplicationErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
