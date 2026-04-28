import axios from 'axios';
import {
    GET_DATA_OVERTIME_SUCCESS,
    GET_DATA_OVERTIME_FAILURE,
    CREATE_DATA_OVERTIME_SUCCESS,
    CREATE_DATA_OVERTIME_FAILURE,
    UPDATE_DATA_OVERTIME_SUCCESS,
    UPDATE_DATA_OVERTIME_FAILURE,
    DELETE_DATA_OVERTIME_SUCCESS,
    DELETE_DATA_OVERTIME_FAILURE,
    APPROVE_DATA_OVERTIME_SUCCESS,
    APPROVE_DATA_OVERTIME_FAILURE
} from './dataOvertimeActionTypes';

export const getDataOvertime = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5001/data_overtime', {
            withCredentials: true
        });
        dispatch({ type: GET_DATA_OVERTIME_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DATA_OVERTIME_FAILURE, payload: error.response.data.msg });
    }
};

export const createDataOvertime = (formData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5001/data_overtime', formData, {
            withCredentials: true
        });
        dispatch({ type: CREATE_DATA_OVERTIME_SUCCESS, payload: response.data.msg });
        return response.data;
    } catch (error) {
        dispatch({ type: CREATE_DATA_OVERTIME_FAILURE, payload: error.response.data.msg });
        throw error;
    }
};

export const updateDataOvertime = (id, formData) => async (dispatch) => {
    try {
        const response = await axios.patch(`http://localhost:5001/data_overtime/update/${id}`, formData, {
            withCredentials: true
        });
        dispatch({ type: UPDATE_DATA_OVERTIME_SUCCESS, payload: response.data.msg });
        return response.data;
    } catch (error) {
        dispatch({ type: UPDATE_DATA_OVERTIME_FAILURE, payload: error.response.data.msg });
        throw error;
    }
};

export const deleteDataOvertime = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:5001/data_overtime/${id}`, {
            withCredentials: true
        });
        dispatch({ type: DELETE_DATA_OVERTIME_SUCCESS, payload: response.data.msg });
        return response.data;
    } catch (error) {
        dispatch({ type: DELETE_DATA_OVERTIME_FAILURE, payload: error.response.data.msg });
        throw error;
    }
};

export const approveDataOvertime = (id) => async (dispatch) => {
    try {
        const response = await axios.patch(`http://localhost:5001/data_overtime/approve/${id}`, {}, {
            withCredentials: true
        });
        dispatch({ type: APPROVE_DATA_OVERTIME_SUCCESS, payload: response.data.msg });
        dispatch(getDataOvertime()); // refresh list
        return response.data;
    } catch (error) {
        dispatch({ type: APPROVE_DATA_OVERTIME_FAILURE, payload: error.response.data.msg });
        throw error;
    }
};
