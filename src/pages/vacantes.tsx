import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";

import { AppContext } from "../context/AppContext";
import { NodeVacante } from "../models/interfaces";

import LastWordColor from "../components/layout/LastWordColor";
import axios from "axios";
import LoaderApi from "../components/shared/LoaderApi";
import ImageApi from "../components/shared/ImageApi";

const UpArrow = () => (
	<svg
		width="29"
		height="17"
		viewBox="0 0 29 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M2 15.5L14.5 3L27 15.5"
			stroke="#8FB436"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);
const DwnArrow = () => (
	<svg
		width="29"
		height="17"
		viewBox="0 0 29 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M27 2L14.5 14.5L2 2"
			stroke="#8FB436"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);

const Tab = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full">
			<div
				className={`cursor-pointer relative ${
					open ? "text-greenmain" : "text-gray"
				} hover:text-greenmain text-lg sm:text-2xl font-light py-8 border-b border-gray pr-20 sm:pr-32`}
				onClick={() => setOpen(!open)}
			>
				{title}
				<div className="absolute right-4 top-1/2 cursor-pointer">
					{open ? <UpArrow /> : <DwnArrow />}
				</div>
			</div>
			{open && <div className="text-gray py-8 font-light">{children}</div>}
		</div>
	);
};

const IndexPage = () => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<NodeVacante[]>([]);
	const [page, setPage] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=vacantes-y-consultorias,vacantes-y-consultorias-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=715,719&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find(
							(page: any) => page.slug === "vacantes-y-consultorias"
						).acf,
						en: res[0].data.find(
							(page: any) => page.slug === "vacantes-y-consultorias-en"
						).acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(715) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(719) !== -1)
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
				setPage(data.page.es);
			} else {
				setNodes(data.nodes.en.sort((a: any, b: any) => b.order - a.order));
				setPage(data.page.en);
			}
	}, [spanish, data]);
	return (
		<>
			{data ? (
				<Layout>
					<div className="w-full relative lg:border-b border-gray font-light text-gray text-base sm:text-lg">
						{page && (
							<div className="container lg:flex pt-8 lg:pt-16 ">
								<div className="lg:w-1/2 font-light text-base sm:text-lg text-gray lg:pr-20 pb-8 lg:pb-0">
									<div className="font-semibold text-greenmain text-4xl sm:text-5xl xl:text-7xl">
										<LastWordColor
											text={page.title}
											mainColor="text-gray"
											lastColor="text-greenmain"
										/>
									</div>
									<div
										className="md:w-4/5"
										dangerouslySetInnerHTML={{ __html: page.content }}
									></div>
								</div>
								<div className="lg:w-1/2 border-t lg:border-0 border-gray">
									<p className="font-light text-greenmain text-xl lg:text-2xl lg:ml-12 mt-8 lg:mt-0 lg:w-1/2 mb-8">
										{page.subheader}
									</p>
									<ImageApi
										myRef={ref}
										id={page.image}
										alt=""
										className={`z-10 w-full transition-all duration-1000 ease-in-out ${
											inView ? "opacity-100" : "opacity-0 translate-x-12"
										}`}
									/>
								</div>
							</div>
						)}
						<div
							className={`hidden lg:block z-0 absolute top-0 right-1/4 lg:left-1/2 border-l border-gray transition-all duration-1000 ease-in-out ${
								inView ? "opacity-100 h-full" : "opacity-0 h-0"
							}`}
						></div>
					</div>
					<div className="container py-8 sm:py-16">
						{nodes.map((vacante, i) => (
							<Tab key={`${i}vacante`} title={vacante.title}>
								<div
									dangerouslySetInnerHTML={{ __html: vacante.content }}
								></div>
							</Tab>
						))}
					</div>
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default IndexPage;

export const Head = () => <SEO title="Vacantes y Consultorias" />;
