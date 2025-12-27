import type { Dispatch } from "redux";
import { useDispatch as useDispatchBase } from "react-redux";
import type { ReduxAction } from "./actions";

export const useDispatch = useDispatchBase.withTypes<Dispatch<ReduxAction>>();
