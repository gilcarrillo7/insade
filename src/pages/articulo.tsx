import axios from "axios";
import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import "react-multi-carousel/lib/styles.css";
import LastWordColor from "../components/layout/LastWordColor";
import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import ThumbSection from "../components/layout/ThumbSection";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";
import { NodeSidePreview } from "../models/interfaces";

const IndexPage = ({ location }: { location: any }) => {
	const params = new URLSearchParams(location.search);
	let slug = params.get("slug");
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [articulo, setArticulo] = useState<any>(null);
	const [slugNext, setSlugNext] = useState<any>("");
	const [data, setData] = useState<any>(null);
	const [prev, setPrev] = useState<NodeSidePreview[]>([]);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/posts?categories=200,203&per_page=100&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=373,377&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				const articles = res[0].data
					.filter((post: any) => post.categories.indexOf(200) !== -1)
					.sort((a: any, b: any) => b.order - a.order)
					.map((post: any) => post.acf);
				const indexCurrent = articles.findIndex(
					(post: any) => post.slug === slug
				);
				const indexNext =
					indexCurrent + 1 === articles.length ? 0 : indexCurrent + 1;
				setSlugNext(articles[indexNext].slug);
				setData({
					page: {
						es: res[0].data
							.filter((post: any) => post.categories.indexOf(200) !== -1)
							.map((post: any) => post.acf)
							.find((post: any) => post.slug === slug),
						en: res[0].data
							.filter((post: any) => post.categories.indexOf(203) !== -1)
							.map((post: any) => post.acf)
							.find((post: any) => post.slug === slug),
					},
					sidelinks: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(373) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(377) !== -1)
							.map((post: any) => post.acf),
					},
				});
			})
			.catch((_error) => {});
		return () => {
			setArticulo(null);
		};
	}, [slug, baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) {
				setArticulo(data.page.es);
				setPrev(data.sidelinks.es.sort((a: any, b: any) => a.order - b.order));
			} else {
				setArticulo(data.page.en);
				setPrev(data.sidelinks.en.sort((a: any, b: any) => a.order - b.order));
			}
	}, [spanish, data]);

	return (
		<>
			{articulo ? (
				<Layout>
					<div className="relative">
						<ImageApi id={articulo["main-image"]} alt="" className="w-full" />
						<div className="w-full absolute bottom-0  gradient-black">
							<div
								ref={ref}
								className={`py-4 sm:pt-48 sm:pb-16 container text-3xl sm:text-5xl lg:text-6xl font-semibold text-white transition-all duration-1000 ease-in-out ${
									inView ? "opacity-100" : "opacity-0 translate-y-12"
								}`}
							>
								<LastWordColor
									text={articulo.title}
									mainColor={"text-white"}
									lastColor={"text-greenmain"}
								/>
							</div>
						</div>
					</div>
					<div className="bg-white">
						<div className="container text-gray py-12 flex flex-col md:flex-row">
							<div className="md:w-3/4 lg:w-3/5 md:pr-12 lg:pr-0 font-light">
								<div
									dangerouslySetInnerHTML={{ __html: articulo.content }}
								></div>
								<Link
									to={`/articulo?slug=${slugNext}`}
									className="text-xl text-greenmain my-12 block"
								>
									{spanish ? "Siguiente" : "Next"}
								</Link>
								<Link to="/articulos" className="text-xl mb-12 block">
									{spanish ? "Ver todos" : "See all"}
								</Link>
							</div>
							<div className="lg:w-1/5"></div>
							<div
								className={`border-b border-gray w-full mb-12 md:hidden`}
							></div>
							<div className="md:w-1/4 lg:w-1/5">
								{prev.map((node) => (
									<ThumbSection
										key={node.title}
										title={node.title}
										img={node.image}
										resume={node.text}
										linkText={node.linktext}
										link={node.link}
									/>
								))}
							</div>
						</div>
					</div>
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default IndexPage;

export const Head = () => <SEO title="Insade - Artículo" />;
