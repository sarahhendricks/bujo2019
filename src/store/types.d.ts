import { ActionType, StateType } from "typesafe-actions";

declare module "typesafe-actions" {
    export type RootState = StateType<typeof import("./pins/reducers").default>;

    export type RootAction = ActionType<typeof import("./root-action").default>;

    interface Types {
        RootAction: RootAction;
    }
}
