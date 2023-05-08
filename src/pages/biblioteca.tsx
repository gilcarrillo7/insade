import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";

import { AppContext } from "../context/AppContext";
import axios from "axios";
import LoaderApi from "../components/shared/LoaderApi";
import ImageApi from "../components/shared/ImageApi";

const Libro = ({
	title,
	img,
	link,
	linktext = "Leer PDF",
}: {
	title: string;
	img: any;
	link: string;
	linktext?: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`flex flex-col justify-between text-lg sm:text-xl mb-12 sm:mb-0 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 translate-y-12"
			}`}
		>
			<ImageApi id={img} alt={title} className="w-full mb-8 px-6 sm:px-0" />
			<p className="text-gray text-base mb-8">{title}</p>
			<a className="text-greenmain underline" href={link} target="_blank">
				{linktext}
			</a>
		</div>
	);
};

const BibliotecaPage = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<any[]>([]);
	const [pageInfo, setPageInfo] = useState({ title: "" });

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=biblioteca,biblioteca-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=321,325&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find((page: any) => page.slug === "biblioteca").acf,
						en: res[0].data.find((page: any) => page.slug === "biblioteca-en")
							.acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(321) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(325) !== -1)
							.map((post: any) => post.acf),
					},
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) {
				setNodes(data.nodes.es.sort((a: any, b: any) => b.order - a.order));
				setPageInfo({
					title: data.page.es.title,
				});
			} else {
				setNodes(data.nodes.en.sort((a: any, b: any) => b.order - a.order));
				setPageInfo({
					title: data.page.en.title,
				});
			}
	}, [spanish, data]);
	return (
		<>
			{data ? (
				<Layout>
					<div className="container pt-20 pb-12">
						<p className="font-semibold text-greenmain text-4xl sm:text-7xl">
							{pageInfo.title}
						</p>
						<div className="flex grid sm:gap-8 lg:gap-20 sm:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-16">
							{nodes.map((libro, i) => (
								<Libro
									key={`${i}${libro.resume}`}
									title={libro.resume}
									img={libro.image}
									link={libro.link}
									linktext={libro.linktext}
								/>
							))}
						</div>
					</div>
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default BibliotecaPage;

export const Head = () => <SEO title="Biblioteca" />;
