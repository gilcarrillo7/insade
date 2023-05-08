import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LastWordColor from "../components/layout/LastWordColor";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";

const InversionSocialPage = () => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>();
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/pages?slug=aviso,aviso-en&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data.find((page: any) => page.slug === "aviso").acf,
					en: res.data.find((page: any) => page.slug === "aviso-en").acf,
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) setPage(data.es);
			else setPage(data.en);
	}, [spanish, data]);
	return (
		<>
			{data ? (
				<Layout>
					{page && (
						<div className="container text-gray py-12">
							<div
								ref={ref}
								className={`sm:mt-4 mb-10 font-semibold text-3xl sm:text-7xl transition-all duration-1000 ease-in-out ${
									inView ? "opacity-100" : "opacity-0 -translate-x-12"
								}`}
							>
								<LastWordColor
									text={page.title}
									mainColor={"text-gray"}
									lastColor={"text-greenmain"}
								/>
							</div>
							<ImageApi
								id={page.image}
								className="mb-8 max-w-full"
								alt="Aviso de Privacidad"
							/>
							<div className="md:w-2/3 font-light">
								<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
							</div>
						</div>
					)}
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default InversionSocialPage;

export const Head = () => <SEO title="Aviso de Privacidad" />;
