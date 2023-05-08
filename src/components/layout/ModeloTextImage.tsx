import React from "react";
import ImageApi from "../shared/ImageApi";

const ModeloTextImage = ({
	img,
	right = true,
	children,
}: {
	img: any;
	right?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div className={`relative w-full border-b border-gray`}>
			<div
				className={`container text-gray font-light py-8 sm:py-48 flex ${
					right ? "" : "sm:justify-end"
				}`}
			>
				<div className={`sm:w-1/2 `}>{children}</div>
			</div>
			<div
				className={`h-full sm:absolute top-0 ${right ? "right-0" : "left-0"}`}
			>
				<ImageApi id={img} className={`h-full`} alt="" />
			</div>
		</div>
	);
};

export default ModeloTextImage;
