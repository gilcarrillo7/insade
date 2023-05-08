import { Link } from "gatsby";
import React from "react";
import { useInView } from "react-intersection-observer";
import ImageApi from "../shared/ImageApi";

const ThumbSection = ({
	title,
	img,
	resume,
	linkText,
	link,
}: {
	title: string;
	img: any;
	resume: string;
	linkText: string;
	link: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<a href={link}>
			<div
				ref={ref}
				className={`mb-8 cursor-pointer transition-all duration-1000 ease-in-out ${
					inView ? "opacity-100" : "opacity-0 translate-y-12"
				}`}
			>
				<p className="mb-6 text-greenmain text-xl">{title}</p>
				<ImageApi alt={title} id={img} className="w-full mb-4" />
				<p className="text-gray text-sm mb-4">{resume}</p>
				<span className="text-greenmain text-sm underline">{linkText}</span>
			</div>
		</a>
	);
};

export default ThumbSection;
