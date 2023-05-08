import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LastWordColor from "../components/layout/LastWordColor";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";
import { NodeBancoNoticias } from "../models/interfaces";

const Noticia = ({
	title,
	resume,
	link,
	linktext = "Seguir leyendo",
}: {
	title: string;
	resume: string;
	link: string;
	linktext?: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`flex flex-col justify-between mb-12 sm:mb-0 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 translate-y-12"
			}`}
		>
			<p className="text-greenmain mb-8 text-xl sm:text-2xl">{title}</p>
			<p className="text-gray mb-4 text-base">{resume}</p>
			<a
				className="text-greenmain underline text-lg sm:text-xl"
				href={link}
				target="_blank"
			>
				{linktext}
			</a>
		</div>
	);
};

const BibliotecaPage = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<NodeBancoNoticias[]>([]);
	const [pageInfo, setPageInfo] = useState({ title: "" });

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=banco-de-noticias,banco-de-noticias-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=308,723&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find(
							(page: any) => page.slug === "banco-de-noticias"
						).acf,
						en: res[0].data.find(
							(page: any) => page.slug === "banco-de-noticias-en"
						).acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(308) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(723) !== -1)
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
						<div className="font-semibold text-gray text-4xl sm:text-7xl">
							<LastWordColor
								text={pageInfo.title}
								mainColor="text-gray"
								lastColor="text-greenmain"
							/>
						</div>
						<div className="flex grid sm:gap-8 lg:gap-20 sm:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-16">
							{nodes.map((noticia, i) => (
								<Noticia
									key={`${i}${noticia.title}`}
									title={noticia.title}
									resume={noticia.resume}
									link={noticia.url}
									linktext={noticia.linktext}
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

export const Head = () => <SEO title="Banco de Noticias" />;
