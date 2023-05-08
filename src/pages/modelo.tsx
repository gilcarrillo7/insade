import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import LastWordColor from "../components/layout/LastWordColor";
import Layout from "../components/layout/Layout";
import ModeloTextImage from "../components/layout/ModeloTextImage";
import { SEO } from "../components/layout/SEO";
import BgImageApi from "../components/shared/BgImageApi";
import Button from "../components/shared/Button";
import ImageApi from "../components/shared/ImageApi";
import LoaderApi from "../components/shared/LoaderApi";
import { AppContext } from "../context/AppContext";

const CardCarousel = ({
	testimony,
	name,
}: {
	testimony: string;
	name: string;
}) => {
	return (
		<div className="flex items-center justify-center">
			<div className="sm:w-4/5 text-gray font-thin text-2xl sm:text-4xl">
				{testimony}
				<p className="font-semibold text-greenmain mt-12">{name}</p>
			</div>
		</div>
	);
};

const IndexPage = ({ location }: { location: any }) => {
	const params = new URLSearchParams(location.search);
	const slug = params.get("slug");
	const { ref, inView } = useInView({ threshold: 0.3 });

	const { spanish, baseUrl } = useContext(AppContext);
	const [model, setModel] = useState<any>(null);

	const [data, setData] = useState<any>(null);
	const testimonies = useMemo<{ title: string; text: string }[]>(
		() =>
			model
				? model.testimonies
					? model.testimonies.split("\n").map((text: any) => ({
							title: text.split("|")[0],
							text: text.split("|")[1],
					  }))
					: []
				: [],

		[spanish, model]
	);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/posts?categories=55,59&per_page=100&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data
						.filter((post: any) => post.categories.indexOf(55) !== -1)
						.map((post: any) => post.acf)
						.find((post: any) => post.slug === slug),
					en: res.data
						.filter((post: any) => post.categories.indexOf(59) !== -1)
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

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
			slidesToSlide: 1,
		},
		tabler: {
			breakpoint: { max: 1024, min: 640 },
			items: 1,
			slidesToSlide: 1,
		},
		mobile: {
			breakpoint: { max: 640, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	};
	return (
		<>
			{model ? (
				<Layout>
					<BgImageApi
						className={`w-full bottom-0 bg-cover`}
						id={model.main_image}
					>
						<div
							ref={ref}
							className={`z-10 pt-24 sm:pt-48 pb-4 sm:pb-16 container font-light text-white transition-all duration-1000 ease-in-out ${
								inView ? "opacity-100" : "opacity-0 translate-y-12"
							}`}
						>
							<div className="mb-4 md:mb-8 text-4xl sm:text-5xl lg:text-6xl font-semibold">
								<LastWordColor
									text={model.title}
									mainColor={"white"}
									lastColor={"text-greenmain"}
								/>
							</div>
							<div className="whitespace-pre-wrap">{model.resume}</div>
						</div>
					</BgImageApi>
					<div className="bg-white">
						{model.image1 && (
							<ModeloTextImage img={model.image1}>
								<div dangerouslySetInnerHTML={{ __html: model.content1 }}></div>
							</ModeloTextImage>
						)}
						{model.image2 && (
							<ModeloTextImage img={model.image2} right={false}>
								<div dangerouslySetInnerHTML={{ __html: model.content2 }}></div>
							</ModeloTextImage>
						)}
						{model.contentgreen && (
							<div className="bg-greensecond text-white py-8 sm:py-20 ">
								<div className="container font-light">
									<div className="md:w-3/5">
										<div
											dangerouslySetInnerHTML={{ __html: model.contentgreen }}
										></div>
									</div>
								</div>
							</div>
						)}
						{model.testimonies && model.testomonytitle && (
							<div className="min-h-screen flex items-center container text-gray py-8 sm:py-20">
								<div className="w-full">
									<div className="relative flex items-center pb-6">
										<p className="text-2xl sm:text-3xl font-semibold">
											{model.testomonytitle}
										</p>
										<svg
											width="83"
											height="50"
											viewBox="0 0 83 50"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="ml-12"
										>
											<path
												d="M29 -1.90735e-06H0.600001L21.8 50H45.8L29 -1.90735e-06ZM66 -1.90735e-06H37.6L58.8 50H82.8L66 -1.90735e-06Z"
												fill="#8FB436"
											/>
										</svg>
										<div
											className={`absolute left-0 bottom-0 border-b border-gray w-1/2`}
										></div>
									</div>
									<div className="relative py-4 sm:py-20">
										<Carousel
											responsive={responsive}
											arrows={false}
											autoPlay={false}
											draggable={true}
											infinite
											keyBoardControl
											minimumTouchDrag={80}
											showDots={true}
											swipeable={true}
											autoPlaySpeed={3000}
										>
											{testimonies.map((test, i) => (
												<CardCarousel
													key={`${i}${test.text}`}
													testimony={test.title}
													name={test.text}
												/>
											))}
										</Carousel>
									</div>
								</div>
							</div>
						)}
						{/**Productos */}
						{model.productostitle && (
							<div className="w-full bg-white relative border-gray border-t">
								<div className="container">
									<div className="flex items-center lg:h-[480px] lg:pr-[430px]">
										<div className="py-12 lg:py-0 text-gray text-lg sm:text-xl font-semibold">
											<p className="text-3xl sm:text-5xl text-gray font-semibold mb-8">
												{model.productostitle}
											</p>
											<div
												dangerouslySetInnerHTML={{
													__html: model.productoscontent,
												}}
											></div>
											<a href={model.buttoproductosurl} target="_blank">
												<Button
													text={model.buttonproductos}
													variant={"greenmain"}
													className="sm:!w-72"
												/>
											</a>
										</div>
									</div>
									<div className="relative lg:absolute text-white top-0 right-0 -mx-4 sm:mx-0">
										<ImageApi
											alt="Banco noticias"
											className="w-full"
											id={model.productosimage}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default IndexPage;

export const Head = () => <SEO title="Insade - Modelo de Intervención" />;
