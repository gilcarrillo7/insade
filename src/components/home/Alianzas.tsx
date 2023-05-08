import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../context/AppContext";
import { NodeAlianza } from "../../models/interfaces";
import LastWordColor from "../layout/LastWordColor";
import ImageApi from "../shared/ImageApi";
import LoaderApi from "../shared/LoaderApi";

const ImageAl = ({ img }: { img: number }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`w-1/3 lg:w-1/4 xl:w-1/5 shrink-0 grow-0 flex flex-nowrap items-center justify-center px-4 mb-4 transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		>
			<ImageApi id={img} alt={`alianza`} className="grow-0" />
		</div>
	);
};

const Alianzas = ({
	title,
	alTitle,
	recTitle,
}: {
	title: string;
	alTitle: string;
	recTitle: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });

	const { baseUrl } = useContext(AppContext);

	const [nodes, setNodes] = useState<any[]>([]);
	const [nodesRec, setNodesRec] = useState<any[]>([]);
	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/posts?categories=447&per_page=100&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/posts?categories=450&per_page=100&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setNodes(
					res[0].data
						.map((post: any) => post.acf)
						.sort((a: NodeAlianza, b: NodeAlianza) => a.order - b.order)
				);
				setNodesRec(
					res[1].data
						.map((post: any) => post.acf)
						.sort((a: NodeAlianza, b: NodeAlianza) => a.order - b.order)
				);
			})
			.catch((_error) => {});
	}, [baseUrl]);

	return (
		<>
			{title !== "" ? (
				<div className="container py-16">
					<div className="text-3xl text-gray font-bold mb-8">
						<LastWordColor
							text={title}
							mainColor={"text-gray"}
							lastColor={"text-greenmain"}
						/>
					</div>
					<p className="text-xl sm:text-xl text-gray font-medium mb-12">
						{alTitle}
					</p>
					<div className="flex flex-wrap mb-12">
						{nodes.map((al, i) => (
							<ImageAl key={`imgAl${i}`} img={al.image} />
						))}
					</div>
					<p className="text-xl sm:text-xl text-gray font-medium mb-12">
						{recTitle}
					</p>
					<div className="flex flex-wrap mb-12">
						{nodesRec.map((al, i) => (
							<ImageAl key={`imgReco${i}`} img={al.image} />
						))}
					</div>
					<div
						ref={ref}
						className={`border-b border-gray transition-all duration-1000 ease-in-out ${
							inView ? "w-full" : "w-0"
						}`}
					></div>
				</div>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default Alianzas;
