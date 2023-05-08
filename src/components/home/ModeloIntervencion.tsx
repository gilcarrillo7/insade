import axios from "axios";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../context/AppContext";

import Button from "../shared/Button";
import ImageApi from "../shared/ImageApi";
import LoaderApi from "../shared/LoaderApi";

const Modelo = ({
	type,
	img,
	title,
	button,
	uri,
}: {
	type: "left" | "right";
	img: any;
	title: string;
	button: string;
	uri: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.1 });
	return (
		<div
			ref={ref}
			className={`sm:flex sm:flex-row transition-all duration-1000 ease-in-out ${
				inView
					? "opacity-100"
					: `opacity-0 ${
							type === "left" ? "-translate-x-16" : "translate-x-16"
					  }`
			}`}
		>
			<div
				className={`relative sm:w-2/3 ${
					type === "right"
						? "sm:order-2 left-mob-margin"
						: "sm:order-1 right-mob-margin"
				} h-64 sm:h-auto overflow-hidden sm:overflow-auto`}
			>
				<ImageApi
					id={img}
					alt={title}
					className="absolute sm:relative h-80 sm:h-auto w-auto sm:w-full max-w-none "
				/>
			</div>
			<div
				className={`sm:flex sm:items-end sm:w-1/3 ${
					type === "right"
						? "sm:order-1 sm:mr-8 justify-end"
						: "sm:order-2 sm:ml-8"
				}`}
			>
				<div className="pt-8 pb-12 left-mob-margin right-mob-margin">
					<p className="font-medium text-lg sm:text-xl mb-4">{title}</p>
					<Button
						text={button}
						variant="greenmain"
						action={() => navigate(uri)}
					/>
				</div>
			</div>
		</div>
	);
};

const ModeloIntervencion = ({ title }: { title: string }) => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<any[]>([]);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=55,59&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(55) !== -1)
						.map((post: any) => post.acf),
					en: res.data
						.filter((post: any) => post.categories.indexOf(59) !== -1)
						.map((post: any) => post.acf),
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish)
				setNodes(
					data.es.sort((a: any, b: any) => b.order - a.order).slice(0, 3)
				);
			else
				setNodes(
					data.en.sort((a: any, b: any) => b.order - a.order).slice(0, 3)
				);
	}, [spanish, data]);

	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<>
			{data ? (
				<div className="text-gray">
					<div className="right-mob-margin">
						<div
							ref={ref}
							className={`border-t border-gray transition-all duration-1000 ease-in-out ${
								inView ? "w-full" : "w-0"
							}`}
						></div>
					</div>
					<div className="w-full">
						<div className="flex justify-end relative left-mob-margin right-mob-margin">
							<div
								className={`border-l border-gray absolute top-0 left-1/3 hidden sm:block transition-all duration-1000 ease-in-out ${
									inView ? "h-full" : "h-0"
								}`}
							></div>
							<p
								className={`text-2xl sm:text-3xl font-medium py-8 sm:w-2/3 text-right sm:text-left sm:pl-8 transition-all duration-1000 ease-in-out ${
									inView ? "opacity-100" : "opacity-0 -translate-x-16"
								}`}
							>
								{title}
							</p>
						</div>
					</div>
					{nodes.map((node, i) => (
						<Modelo
							key={`${i}${node.title}`}
							type={i % 2 === 0 ? "left" : "right"}
							img={node.image}
							title={node.title}
							button={node.button_title}
							uri={`modelo?slug=${node.slug}`}
						/>
					))}
				</div>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default ModeloIntervencion;
