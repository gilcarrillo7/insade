import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import { useInView } from "react-intersection-observer";
import Button from "../shared/Button";
import { AppContext } from "../../context/AppContext";
import { NodeResultado } from "../../models/interfaces";
import axios from "axios";
import LoaderApi from "../shared/LoaderApi";

const Slide = ({
	main,
	sub,
	pair,
	last,
}: {
	main: string;
	sub: string;
	pair: boolean;
	last: boolean;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`flex max-w-[275px] sm:max-w-none sm:pr-4 justify-center sm:justify-left transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		>
			<div className="pt-4 px-12 sm:px-2 lg:px-0 ">
				<p
					className={`text-6xl font-bold ${
						pair ? "text-white" : "text-greenmain"
					}`}
				>
					{main}
				</p>
				<p
					className={`text-2xl font-light ${
						pair ? "text-greenmain" : "text-white"
					}`}
				>
					{sub}
				</p>
			</div>
			<div
				className={`hidden ${
					last ? "" : "sm:block"
				} border-l border-white right-4 absolute top-0 transition-all duration-1000 ease-in-out ${
					inView ? "h-full" : "h-0"
				}`}
			></div>
		</div>
	);
};

const Left = ({ onClick }: { onClick?: any }) => (
	<div
		className="lg:hidden absolute left-0 top-1/2 cursor-pointer z-10"
		onClick={onClick}
	>
		<svg
			width="17"
			height="29"
			viewBox="0 0 17 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.5 27L3 14.5L15.5 2"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	</div>
);
const Right = ({ onClick }: { onClick?: any }) => (
	<div
		className="lg:hidden absolute right-0 top-1/2 cursor-pointer z-10"
		onClick={onClick}
	>
		<svg
			width="17"
			height="29"
			viewBox="0 0 17 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2 2L14.5 14.5L2 27"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	</div>
);

const Resultados = ({
	title,
	imgTitle,
	subtitle,
	btn1Text,
	btn1Url,
	btn2Text,
	btn2Url,
}: {
	title: string;
	imgTitle: string;
	subtitle: string;
	btn1Text: string;
	btn1Url: string;
	btn2Text: string;
	btn2Url: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });

	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<NodeResultado[]>([]);

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=577,581&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(577) !== -1)
						.map((post: any) => post.acf),
					en: res.data
						.filter((post: any) => post.categories.indexOf(581) !== -1)
						.map((post: any) => post.acf),
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish)
				setNodes(data.es.sort((a: any, b: any) => a.order - b.order));
			else setNodes(data.en.sort((a: any, b: any) => a.order - b.order));
	}, [spanish, data]);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			slidesToSlide: 1,
		},
		tabler: {
			breakpoint: { max: 1024, min: 640 },
			items: 3,
			slidesToSlide: 1,
		},
		mobile: {
			breakpoint: { max: 640, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	};

	return (
		<>
			{data ? (
				<div
					className="min-h-screen sm:min-h-0 bg-greensecond py-12 text-white"
				>
					<div className="container mx-auto">
						<div
							ref={ref}
							className={`flex mb-8 transition-all duration-1000 ease-in-out ${
								inView ? "opacity-100" : "opacity-0 -translate-y-16"
							}`}
						>
							<p className="font-medium text-3xl flex items-center">{title}</p>
							<img className="ml-8" src={imgTitle} />
						</div>
						<Carousel
							className="relative sm:pointer-events-none	"
							responsive={responsive}
							arrows={true}
							autoPlay={false}
							draggable={true}
							infinite
							keyBoardControl
							minimumTouchDrag={80}
							showDots={false}
							swipeable={true}
							autoPlaySpeed={3000}
							customLeftArrow={<Left />}
							customRightArrow={<Right />}
						>
							{nodes.map((slide, i) => (
								<Slide
									key={`slide${i}`}
									main={slide.maintext}
									sub={slide.subtext}
									pair={i % 2 === 0}
									last={i === nodes.length - 1}
								/>
							))}
						</Carousel>
						<div className="flex flex-wrap flex-col lg:flex-row mt-16">
							<p className="xl:pr-16 sm:text-xl sm:max-w-md mb-4">{subtitle}</p>

							<div className="flex shrink-0 left-mob-margin right-mob-margin sm:mr-16 mb-4 sm:mb-8">
								<a href={btn1Url} target="_blank" className="block w-full">
									<Button text={btn1Text} variant="whitefile" className="" />
								</a>
							</div>
							<div className="flex shrink-0 left-mob-margin right-mob-margin sm:mr-4 sm:mb-8">
								<a href={btn2Url} target="_blank" className="block w-full">
									<Button text={btn2Text} variant="whitefile" className="" />
								</a>
							</div>
						</div>
					</div>
				</div>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default Resultados;
