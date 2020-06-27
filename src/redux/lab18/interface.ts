import { User } from "./models";

export interface State{
    error : string | null;
    isWorking : boolean;
    usersQueue : User[];
}