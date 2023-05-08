import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LastWordColor from "../components/layout/LastWordColor";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";

const ImageInv = ({ img }: { img: any }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`w-1/2 sm:w-1/3 lg:w-1/4 shrink-0 grow-0 flex flex-nowrap items-center justify-center px-4 mb-4 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		>
			<ImageApi id={img} alt={`alianza`} className="grow-0" />
		</div>
	);
};

const InversionSocialPage = () => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { spanish, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/pages?slug=inversion-social-en,inversion-social&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data.find((page: any) => page.slug === "inversion-social")
						.acf,
					en: res.data.find((page: any) => page.slug === "inversion-social-en")
						.acf,
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
						<>
							<div className="container text-gray py-12">
								<div className="md:w-3/4 lg:w-2/3 md:pr-12 lg:pr-0 text-lg sm:text-xl font-light">
									<div
										ref={ref}
										className={`sm:mt-4 mb-6 sm:mb-12 font-semibold text-3xl sm:text-7xl transition-all duration-1000 ease-in-out ${
											inView ? "opacity-100" : "opacity-0 -translate-x-12"
										}`}
									>
										<LastWordColor
											text={page.title}
											mainColor="text-gray"
											lastColor="text-greenmain"
										/>
									</div>
									<div
										dangerouslySetInnerHTML={{ __html: page.container1 }}
									></div>
									<div
										className={`border-b border-gray my-8 sm:my-12 transition-all duration-1000 ease-in-out ${
											inView ? "opacity-100 w-full" : "opacity-0 w-0"
										}`}
									></div>
									<div
										dangerouslySetInnerHTML={{ __html: page.container2 }}
									></div>
								</div>
							</div>
							<div className="container my-8 flex flex-wrap">
								{page.image1 && <ImageInv img={page.image1} />}
								{page.image2 && <ImageInv img={page.image2} />}
								{page.image3 && <ImageInv img={page.image3} />}
								{page.image4 && <ImageInv img={page.image4} />}
								{page.image5 && <ImageInv img={page.image5} />}
								{page.image6 && <ImageInv img={page.image6} />}
								{page.image7 && <ImageInv img={page.image7} />}
								{page.image8 && <ImageInv img={page.image8} />}
							</div>
						</>
					)}
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default InversionSocialPage;

export const Head = () => <SEO title="Inversión Social" />;
