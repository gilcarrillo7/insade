import * as React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

interface IProps {
	children: boolean | React.ReactFragment | React.ReactPortal | React.ReactNode;
	bgColor?: string;
}

const Layout = (props: IProps) => {
	const { bgColor = "" } = props;

	return (
		<>
			<Header bgColor={bgColor} />
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					type: "spring",
					mass: 0.35,
					stiffness: 50,
					duration: 0.5,
				}}
				className="flex flex-col overflow-hidden"
			>
				{props.children}
			</motion.main>
			<Footer />
		</>
	);
};

export default Layout;
