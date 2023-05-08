import React from "react";
import { BeatLoader } from "react-spinners";

const LoaderApi = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<BeatLoader color="#8FB436" className="m-auto" />
		</div>
	);
};

export default LoaderApi;
