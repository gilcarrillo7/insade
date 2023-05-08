import React from "react";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./src/context/AppContext";

import "./src/styles/global.scss";

interface IProps {
	element: any;
}

export const wrapRootElement = ({ element }: IProps) => (
	<AppProvider>
		<AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
	</AppProvider>
);
