import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LastWordColor from "../components/layout/LastWordColor";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import Button from "../components/shared/Button";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";

const BibliotecaPage = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/pages?slug=dona,dona-en&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data.find((page: any) => page.slug === "dona").acf,
					en: res.data.find((page: any) => page.slug === "dona-en").acf,
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
						<div className="container pt-20 pb-12">
							<div className="font-semibold text-gray text-4xl sm:text-7xl">
								<LastWordColor
									text={page.title}
									mainColor="text-gray"
									lastColor="text-greenmain"
								/>
							</div>
							<div className="text-gray mt-12 sm:mt-16 sm:w-3/4 text-lg sm:text-xl font-light">
								<div dangerouslySetInnerHTML={{ __html: page.content }}></div>

								<Button
									className="mt-4"
									text={page.buttontext}
									variant={"greenmain"}
									action={() => window.open(page.url)}
								/>
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

export default BibliotecaPage;

export const Head = () => <SEO title="Donar" />;
