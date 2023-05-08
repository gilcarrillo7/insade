import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LastWordColor from "../components/layout/LastWordColor";
import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import ThumbSection from "../components/layout/ThumbSection";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";

const IndexPage = ({ location }: { location: any }) => {
	const params = new URLSearchParams(location.search);
	let slug = params.get("slug");
	const { ref, inView } = useInView({ threshold: 0.3 });

	const { spanish, baseUrl } = useContext(AppContext);

	const [data, setData] = useState<any>(null);
	const [model, setModel] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=661,697&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(661) !== -1)
						.map((post: any) => post.acf)
						.find((post: any) => post.slug === slug),
					en: res.data
						.filter((post: any) => post.categories.indexOf(697) !== -1)
						.map((post: any) => post.acf)
						.find((post: any) => post.slug === slug),
				});
			})
			.catch((_error) => {});
	}, [slug, baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) setModel(data.es);
			else setModel(data.en);
	}, [spanish, data]);

	return (
		<>
			{model ? (
				<Layout>
					<div className="relative">
						<ImageApi
							id={model.image ? model.image : ""}
							alt=""
							className="w-full"
						/>
						<div className="gradient-black w-full h-full absolute top-0 left-0"></div>
						<div className="w-full absolute top-1/2 -translate-y-1/2">
							<div
								ref={ref}
								className={`py-4 sm:pt-48 sm:pb-16 container text-xl sm:text-6xl lg:text-8xl font-semibold text-white transition-all duration-1000 ease-in-out ${
									inView ? "opacity-100" : "opacity-0 translate-y-12"
								}`}
							>
								<LastWordColor
									text={model.title || ""}
									mainColor={"text-white"}
									lastColor={"text-greenmain"}
								/>
								{model.subtitle && (
									<p className="mt-4 sm:mt-8 text-xs sm:text-lg lg:text-2xl font-light">
										{model.subtitle}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="bg-white">
						<div className="container font-light text-gray py-12 flex flex-col md:flex-row">
							<div className="md:w-3/4 lg:w-3/5 md:pr-12 lg:pr-0 font-light">
								<div dangerouslySetInnerHTML={{ __html: model.content }}></div>
							</div>
							<div className="lg:w-1/5"></div>
							<div
								className={`border-b border-gray w-full mb-12 md:hidden`}
							></div>
							<div className="md:w-1/4 lg:w-1/5">
								{model.prevtitle && (
									<ThumbSection
										title={model.prevtitle}
										img={model.previmage}
										resume={model.prevresume}
										linkText={model.prevlinktext}
										link={model.prevlinkurl}
									/>
								)}
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

export const Head = () => <SEO title="Insade" />;
