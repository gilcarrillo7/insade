import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Alianzas from "../components/home/Alianzas";
import Articulos from "../components/home/Articulos";
import Banco from "../components/home/Banco";
import Inicio from "../components/home/Inicio";
import ModeloIntervencion from "../components/home/ModeloIntervencion";
import Resultados from "../components/home/Resultados";

import Layout from "../components/layout/Layout";
import { SEO } from "../components/layout/SEO";
import { AppContext } from "../context/AppContext";
import LoaderApi from "../components/shared/LoaderApi";

const IndexPage = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [data, setData] = useState<any>(null);
	const [page, setPage] = useState<any>(null);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=home&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/pages?slug=home-en&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setData({ es: res[0].data[0].acf, en: res[1].data[0].acf });
			})
			.catch((_error) => {});
	}, []);

	useEffect(() => {
		if (data)
			if (spanish) setPage(data.es);
			else setPage(data.en);
	}, [spanish, data]);

	return (
		<>
			<Layout>
				<Inicio
					title={page ? page.title : ""}
					buttonText={page ? page.mainbutton : ""}
					buttonUrl={page ? page.mainbuttonurl : ""}
				/>
				<div id="modelosIntervencion">
					<ModeloIntervencion title={page ? page.modelostitle : ""} />
				</div>
				<div id="resultados">
					<Resultados
						title={page ? page.resultadostitle : ""}
						imgTitle={page ? page.resultadosimg.sourceUrl : ""}
						subtitle={page ? page.resultadostext : ""}
						btn1Text={page ? page.resultadosbtn1text : ""}
						btn1Url={page ? page.resultadosbtn1url : ""}
						btn2Text={page ? page.resultadosbtn2text : ""}
						btn2Url={page ? page.resultadosbtn2url : ""}
					/>
				</div>
				<div id="alianzas">
					<Alianzas
						title={page ? page.alianzasreconocimeintotitle : ""}
						alTitle={page ? page.alianzastitle : ""}
						recTitle={page ? page.reconocimientostitle : ""}
					/>
				</div>
				<div id="articulos">
					<Articulos
						title={page ? page.artstitle : ""}
						subtitle={page ? page.artssubtitle : ""}
						btntext={page ? page.artsbutton : ""}
					/>
				</div>
				<Banco
					title={page ? page.bancotitle : ""}
					subtitle={page ? page.bancosubtitle : ""}
					imgbancos={page ? page.bancosimg : 0}
					linkText={page ? page.bancolinktext : ""}
					btnText={page ? page.bancobtntext : ""}
				/>
			</Layout>
		</>
	);
};

export default IndexPage;

export const Head = () => <SEO title="Home" />;
