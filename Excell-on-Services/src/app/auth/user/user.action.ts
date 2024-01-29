import { createAction, props } from "@ngrx/store"
import { User } from "src/app/interfaces/user"

export const SHOW_ALERT ='[app] show alert'
export const EMPTY_ACTION ='[app] empty'

export const BEGIN_REGISTER='[auth] begin register'


export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:User}>())

export const showalert = createAction(
    SHOW_ALERT,
    props<{ message: string; resulttype: string }>()
  );

  export const emptyaction=createAction(EMPTY_ACTION)