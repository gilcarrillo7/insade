import React, { useContext, useEffect, useState } from "react";
import Articulo from "../components/home/Articulo";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import { AppContext } from "../context/AppContext";
import LastWordColor from "../components/layout/LastWordColor";
import axios from "axios";
import LoaderApi from "../components/shared/LoaderApi";

const Articulos = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<any[]>([]);
	const [pageInfo, setPageInfo] = useState({ title: "" });

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=articulos,articulos-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=200,203&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find((page: any) => page.slug === "articulos").acf,
						en: res[0].data.find((page: any) => page.slug === "articulos-en")
							.acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(200) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(203) !== -1)
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
					<div id="articulos" className="container py-8 sm:py-16">
						<div className="font-semibold text-4xl sm:text-7xl text-gray mb-4 sm:mb-12">
							<LastWordColor
								text={pageInfo.title}
								mainColor="text-gray"
								lastColor="text-greenmain"
							/>
						</div>
						<div className="sm:flex gap-8 md:gap-28 mb-8 sm:mb-12">
							{nodes.map((art, i) => (
								<Articulo
									key={`articulo${i}`}
									img={art.thumb}
									title={art.title}
									resume={art.resume}
									linktext={art.link_text}
									link={art.slug}
									index={i}
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

export default Articulos;
export const Head = () => <SEO title="Articulos" />;
