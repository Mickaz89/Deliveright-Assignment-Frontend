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
