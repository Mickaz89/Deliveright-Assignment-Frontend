import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'
import axiosInstance from '../utils/axios'
import { CreateTask, Task } from '../interfaces'
import { Types } from 'mongoose'

export interface TaskState {
    tasks: Task[],
    loading: boolean,
    error: string
}

const initialState : TaskState = {
    tasks: [],
    loading: false,
    error: ""
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        startFetchTasks: (state) => {
            state.loading = true
        },
        fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        onError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload
        },
    },
})

export const {
    startFetchTasks,
    fetchTasksSuccess,
    onError
} = taskSlice.actions

export const fetchTasks = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startFetchTasks());
    try {
        let url = `http://localhost:3000/task`

        const response = await axiosInstance.get(url);
        dispatch(fetchTasksSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(onError(error.message));
        }
    }
};

export const createTask = (body: CreateTask) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        let url = `http://localhost:3000/task/create`
        await axiosInstance.post(url, body);
        dispatch(fetchTasks());
    } catch (error) {
        if (error instanceof Error) {
            dispatch(onError(error.message));
        }
    }
};

export const updateTask = (id: string, body: Partial<CreateTask>) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        let url = `http://localhost:3000/task/update/${id}`
        await axiosInstance.post(url, body);
        dispatch(fetchTasks());
    } catch (error) {
        if (error instanceof Error) {
            dispatch(onError(error.message));
        }
    }
}

export const deleteTask = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        let url = `http://localhost:3000/task/delete/${id}`
        await axiosInstance.delete(url);
        dispatch(fetchTasks());
    } catch (error) {
        if (error instanceof Error) {
            dispatch(onError(error.message));
        }
    }
}

export default taskSlice.reducer