import { Link } from "gatsby";
import React from "react";
import { useInView } from "react-intersection-observer";
import ImageApi from "../shared/ImageApi";

const Articulo = ({
	img,
	title,
	resume,
	linktext,
	link,
	index,
	className = "",
}: {
	img: any;
	title: string;
	resume: string;
	linktext: string;
	link: string;
	index: number;
	className?: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`w-full text-sm flex-col flex mb-8 sm:mb-0 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 -translate-y-16"
			} ${className}`}
		>
			<ImageApi id={img} alt="title" className="w-full mb-4 px-6 sm:px-0" />
			<p className="text-greenmain font-normal text-lg mb-4">{title}</p>
			<p className="text-gray mb-8 font-light">{resume}</p>
			<Link
				to={`/articulo?slug=${link}`}
				className="text-greenmain underline mt-auto"
			>
				{linktext}
			</Link>
		</div>
	);
};

export default Articulo;
