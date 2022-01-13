import React from "react";

import { ToastContext } from "./types";

export const TOAST_CONTEXT = React.createContext<ToastContext | null>(null);
