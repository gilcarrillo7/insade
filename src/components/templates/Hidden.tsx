import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { NodeHidden } from "../../models/interfaces";
import { AppContext } from "../../context/AppContext";
import Layout from "../layout/Layout";
import { SEO } from "../layout/SEO";
import LastWordColor from "../layout/LastWordColor";
import ThumbSection from "../layout/ThumbSection";

const IndexPage = ({
	pageContext,
}: {
	pageContext: {
		data: { es: NodeHidden; en: NodeHidden };
	};
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });

	const { spanish } = useContext(AppContext);

	const [model, setModel] = useState<NodeHidden>(pageContext.data.es);

	useEffect(() => {
		setModel(spanish ? pageContext.data.es : pageContext.data.en);
	}, [spanish]);

	return (
		<>
			{model && (
				<Layout>
					<div className="relative">
						<img
							src={model.image ? model.image.sourceUrl : ""}
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
										img={model.previmage.sourceUrl}
										resume={model.prevresume}
										linkText={model.prevlinktext}
										link={model.prevlinkurl}
									/>
								)}
							</div>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
};

export default IndexPage;

export const Head = () => <SEO title="Insade - Modelo de Intervención" />;
