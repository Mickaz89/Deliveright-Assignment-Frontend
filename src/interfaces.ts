import { Types } from 'mongoose';

export enum TaskStatus {
    OPEN = 'open',
    CLOSED = 'closed',
  }

export interface Task {
  _id: string;
  content: string;
  status: TaskStatus;
  user: Types.ObjectId;
}

export interface CreateTask {
    content: string;
    status: TaskStatus;
    user: string;
  }

export interface User {
    _id: string;
    username: string;
    name: string;
    password: string;
}
