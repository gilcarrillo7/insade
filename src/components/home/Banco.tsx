import axios from "axios";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { NodeBancoNoticias } from "../../models/interfaces";
import Button from "../shared/Button";
import ImageApi from "../shared/ImageApi";

const Banco = ({
	title,
	subtitle,
	imgbancos,
	linkText,
	btnText,
}: {
	title: string;
	subtitle: string;
	imgbancos: number;
	linkText: string;
	btnText: string;
}) => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<NodeBancoNoticias>();

	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=308,723&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(308) !== -1)
						.map((post: any) => post.acf)
						.sort((a: any, b: any) => a.order - b.order)
						.reverse()[0],
					en: res.data
						.filter((post: any) => post.categories.indexOf(723) !== -1)
						.map((post: any) => post.acf)
						.sort((a: any, b: any) => a.order - b.order)
						.reverse()[0],
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) setNodes(data.es);
			else setNodes(data.en);
	}, [spanish, data]);

	return (
		<div id="banco" className="w-full bg-greensecond relative">
			<div className="container">
				<div className="flex items-center sm:h-[380px] sm:pr-[300px] lg:pr-[430px]">
					<div className="py-12 sm:py-0">
						<p className="text-3xl sm:text-4xl text-white font-semibold mb-8">
							{title}
						</p>
						<p className="text-xl sm:text-2xl font-semibold text-greenmain">
							{subtitle}
						</p>
					</div>
				</div>
				{nodes && (
					<div className="relative sm:absolute text-white top-0 right-0 -mx-4 sm:mx-0">
						<ImageApi alt="Banco noticias" className="w-full" id={imgbancos} />
						<div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-4/5 px-4 sm:px-0">
							<p className="text-xl font-semibold mb-4">{nodes.title}</p>
							<p className="mb-4 text-sm font-thin">{nodes.resume}</p>
							<a className="underline text-sm" target="_blank" href={nodes.url}>
								{linkText}
							</a>

							<div className="left-mob-margin right-mob-margin mt-6">
								<Button
									text={btnText}
									variant="white"
									action={() => navigate("/banco_noticias")}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Banco;
