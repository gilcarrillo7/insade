import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import { NodeEquipoPost } from "../models/interfaces";
import { AppContext } from "../context/AppContext";
import LastWordColor from "../components/layout/LastWordColor";
import axios from "axios";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";

const Member = ({
	title,
	img,
	role,
}: {
	title: string;
	img: any;
	role: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`mb-12 sm:mb-0 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 translate-y-12"
			}`}
		>
			<ImageApi id={img} alt={title} className={"w-full mb-8 px-6 sm:px-0"} />
			<p className="font-semibold text-greenmain text-2xl sm:text-2xl mb-8">
				{title}
			</p>
			<p className="text-gray sm:text-lg">{role}</p>
		</div>
	);
};

const EquipoPage = () => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<NodeEquipoPost[]>([]);
	const [pageInfo, setPageInfo] = useState({ title: "", text: "", image: 0 });

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=equipo,equipo-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=727,731&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({
					page: {
						es: res[0].data.find((page: any) => page.slug === "equipo").acf,
						en: res[0].data.find((page: any) => page.slug === "equipo-en").acf,
					},
					nodes: {
						es: res[1].data
							.filter((post: any) => post.categories.indexOf(727) !== -1)
							.map((post: any) => post.acf),
						en: res[1].data
							.filter((post: any) => post.categories.indexOf(731) !== -1)
							.map((post: any) => post.acf),
					},
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) {
				setNodes(data.nodes.es.sort((a: any, b: any) => a.order - b.order));
				setPageInfo({
					title: data.page.es.title,
					text: data.page.es.text,
					image: data.page.es.image,
				});
			} else {
				setNodes(data.nodes.en.sort((a: any, b: any) => a.order - b.order));
				setPageInfo({
					title: data.page.en.title,
					text: data.page.en.text,
					image: data.page.en.image,
				});
			}
	}, [spanish, data]);

	return (
		<>
			{data ? (
				<Layout>
					<div className="w-full relative">
						<div
							className={`hidden lg:block z-0 absolute top-0 right-1/4 lg:left-1/2 border-l border-gray transition-all duration-1000 ease-in-out ${
								inView ? "opacity-100 h-16" : "opacity-0 h-0"
							}`}
						></div>
						<div className="container z-10 flex flex-col lg:flex-row pt-8 lg:pt-16">
							<div className="sm:w-4/5 lg:w-2/5 lg:mr-8">
								<div className="font-semibold text-4xl sm:text-7xl">
									<LastWordColor
										text={pageInfo.title}
										mainColor="text-gray"
										lastColor="text-greenmain"
									/>
								</div>
								<p className="font-normal text-xl sm:text-2xl text-gray mt-8">
									{pageInfo.text}
								</p>
							</div>
							<div className="lg:w-3/5">
								<ImageApi
									myRef={ref}
									id={pageInfo.image}
									alt={""}
									className={`w-full mt-4 lg:mt-0 transition-all duration-1000 ease-in-out ${
										inView ? "opacity-100" : "opacity-0 translate-x-12"
									}`}
								/>
							</div>
						</div>
					</div>
					<div className="container pt-20 pb-12">
						<div className="flex grid sm:gap-8 lg:gap-20 sm:grid-cols-2 lg:grid-cols-3">
							{nodes.map((member, i) => (
								<Member
									key={`${i}${member.name}`}
									title={member.name}
									img={member.image}
									role={member.role}
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

export default EquipoPage;

export const Head = () => <SEO title="Equipo" />;
