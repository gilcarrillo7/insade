import React from "react";
import { useInView } from "react-intersection-observer";

import Button from "../shared/Button";
import Icon from "../../images/home/icon1.svg";
import { navigate } from "gatsby";

const Inicio = ({
	title,
	buttonText,
	buttonUrl,
}: {
	title: string;
	buttonText: string;
	buttonUrl: string;
}) => {
	const textTitle = title.split(" ");
	const { ref, inView } = useInView({ threshold: 0.3 });

	return (
		<div className="w-full flex flex-col sm:items-center my-44 xl:my-20">
			<div ref={ref} className="container right-mob-margin">
				<div className="relative tracking-wider font-bold text-gray text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
					<p
						className={`transition-all duration-1000 ease-in-out ${
							inView ? "opacity-100" : "opacity-0 -translate-x-16"
						}`}
					>
						{textTitle[0] && textTitle[0]}
						<br />
						{textTitle[1] && textTitle[1]}{" "}
						<span className="text-greenmain">
							{textTitle[2] && textTitle[2]}
						</span>
						<br />
						{textTitle.length > 3 &&
							textTitle.slice(3, textTitle.length).join(" ")}
					</p>
					<img
						src={Icon}
						className={`absolute transition-all duration-1000 ease-in-out xl:scale-125 -top-20 md:top-1/2 ${
							inView
								? "opacity-100 -translate-y-1/2 sm:-translate-y-1/2 right-20"
								: "opacity-0 right-1/2  sm:-translate-y-1/2 sm:right-1/4"
						}`}
						alt="Insade"
					/>
				</div>
			</div>

			<div className="sm:container left-mob-margin right-mob-margin">
				<Button
					text={buttonText}
					variant="greenmain"
					className="mt-12 sm:mt-4"
					action={() => navigate(buttonUrl)}
				/>
			</div>
		</div>
	);
};

export default Inicio;
