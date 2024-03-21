import { Types } from 'mongoose';

export enum TaskStatus {
    OPEN = 'open',
    CLOSED = 'closed',
  }

export interface Task {
  _id: Types.ObjectId;
  content: string;
  status: TaskStatus;
  user: Types.ObjectId;
}

export interface CreateTask {
    content: string;
    status: TaskStatus;
    user: Types.ObjectId;
  }

export interface User {
    _id: Types.ObjectId;
    username: string;
    name: string;
    password: string;
}
