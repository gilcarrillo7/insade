import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";

import ThumbSection from "../components/layout/ThumbSection";
import { SEO } from "../components/layout/SEO";
import { AppContext } from "../context/AppContext";
import { NodeSidePreview } from "../models/interfaces";
import axios from "axios";
import LoaderApi from "../components/shared/LoaderApi";

const IndexPage = () => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>({
		video: "",
		title: "",
		content: "",
	});
	const [prev, setPrev] = useState<NodeSidePreview[]>([]);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=quienes_somos,quienes_somos_en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=735,739&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find((page: any) => page.slug === "quienes_somos")
							.acf,
						en: res[0].data.find(
							(page: any) => page.slug === "quienes_somos_en"
						).acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(735) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(739) !== -1)
							.map((post: any) => post.acf),
					},
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) {
				setPrev(data.nodes.es.sort((a: any, b: any) => a.order - b.order));
				setPage({
					title: data.page.es.title,
					video: data.page.es.video,
					content: data.page.es.content,
				});
			} else {
				setPrev(data.nodes.en.sort((a: any, b: any) => a.order - b.order));
				setPage({
					title: data.page.en.title,
					video: data.page.en.video,
					content: data.page.en.content,
				});
			}
	}, [spanish, data]);

	return (
		<>
			{data ? (
				<Layout bgColor="bg-greensecond">
					<div className="sm:container sm:pt-4 sm:pb-12">
						<div className="w-full h-72 sm:h-[30rem] lg:h-[36rem]">
							<ReactPlayer url={page.video} width="100%" height="100%" />
						</div>
					</div>
					<div className="bg-white">
						<div className="container text-gray py-12 flex flex-col md:flex-row">
							<div className="md:w-3/4 lg:w-3/5 md:pr-12 lg:pr-0">
								<p
									ref={ref}
									className={`font-semibold text-3xl sm:text-4xl transition-all duration-1000 ease-in-out ${
										inView ? "opacity-100" : "opacity-0 -translate-x-12"
									}`}
								>
									{page.title}
								</p>
								<div
									className={`border-b border-gray my-8 transition-all duration-1000 ease-in-out ${
										inView ? "opacity-100 w-full" : "opacity-0 w-0"
									}`}
								></div>

								<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
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

export const Head = () => <SEO title="Quienes Somos" />;
