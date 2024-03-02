import { createEntityAdapter } from "@ngrx/entity";
import { User, UserModel } from "src/app/interfaces/user";

export const UserAdapter = createEntityAdapter<User>();

export const UserState:UserModel=UserAdapter.getInitialState();
