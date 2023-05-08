import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

const HamburgerMenu = ({ color }: { color: string }) => {
	const { menuOpen, setMenuOpen } = useContext(AppContext);

	return (
		<button
			className={`relative sm:absolute sm:right-0 z-50 w-10 h-10 focus:outline-none bg-transparent transition duration-200 ease-in-out ${
				menuOpen ? "text-white" : "text-black"
			}`}
			onClick={() => setMenuOpen(!menuOpen)}
		>
			<span className="sr-only bg-gray">Menu</span>
			<div className="block w-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-10 transform transition duration-500 ease-in-out bg-${color} ${
						menuOpen ? "rotate-45" : `-translate-y-4`
					}`}
				></span>
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-10 bg-${color} ${
						menuOpen ? "opacity-0" : ""
					} transform transition duration-500 ease-in-out `}
				></span>
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-10 transform  transition duration-500 ease-in-out bg-${color} ${
						menuOpen ? "-rotate-45" : `translate-y-4`
					}`}
				></span>
			</div>
		</button>
	);
};

export default HamburgerMenu;
