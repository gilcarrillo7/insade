import axios from "axios";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

import Button from "../shared/Button";
import LoaderApi from "../shared/LoaderApi";
import Articulo from "./Articulo";

const Articulos = ({
	title,
	subtitle,
	btntext,
}: {
	title: string;
	subtitle: string;
	btntext: string;
}) => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<any[]>([]);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=200,203&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(200) !== -1)
						.map((post: any) => post.acf),
					en: res.data
						.filter((post: any) => post.categories.indexOf(203) !== -1)
						.map((post: any) => post.acf),
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish)
				setNodes(
					data.es.sort((a: any, b: any) => b.order - a.order).slice(0, 3)
				);
			else
				setNodes(
					data.en.sort((a: any, b: any) => b.order - a.order).slice(0, 3)
				);
	}, [spanish, data]);

	return (
		<>
			{data ? (
				<div className="container pb-16">
					<p className="font-medium text-3xl text-gray mb-4">{title}</p>
					<p className="text-xl text-greenmain mb-4">{subtitle}</p>
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
								className={i !== 0 ? "hidden sm:flex" : ""}
							/>
						))}
					</div>

					<div className=" left-mob-margin right-mob-margin">
						<Button
							text={btntext}
							variant="greenmain"
							action={() => navigate("/articulos")}
						/>
					</div>
				</div>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default Articulos;
