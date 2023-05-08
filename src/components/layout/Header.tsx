import { Link, navigate } from "gatsby";
import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";

import Button from "../shared/Button";
import ImageApi from "../shared/ImageApi";
import LoaderApi from "../shared/LoaderApi";
import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";

const Header = ({ bgColor }: { bgColor?: string }) => {
	const { menuOpen, spanish, setSpanish, layoutData } = useContext(AppContext);
	const [logo, setLogo] = useState(0);
	const color = bgColor === "bg-greensecond" || menuOpen ? "white" : "gray";

	const [page, setPage] = useState<any>();

	useEffect(() => {
		if (layoutData && layoutData.header) {
			if (spanish) setPage(layoutData.header.es);
			else setPage(layoutData.header.en);
		}
	}, [spanish, layoutData]);

	useEffect(() => {
		if (layoutData && layoutData.header)
			if (menuOpen || bgColor === "bg-greensecond")
				setLogo(layoutData.header.es.logo_white);
			else setLogo(layoutData.header.es.logo);
	}, [menuOpen, bgColor, layoutData]);

	const saveLang = () => {
		localStorage.setItem("langSpanish", spanish ? "false" : "true");
		setSpanish(!spanish);
	};

	return (
		<>
			<Helmet
				bodyAttributes={{
					class: `${bgColor} ${menuOpen ? "overflow-hidden" : ""}`,
				}}
			/>
			{layoutData && layoutData.header ? (
				<>
					<header
						className={`relative font-light border-b z-50 transition-all duration-1000 ease-in-out border-${color} ${
							menuOpen ? "bg-greensecond" : ""
						}`}
					>
						<div className="sm:relative container flex justify-between items-center">
							<Link to="/">
								<ImageApi id={logo} alt="Insade" className="" />
							</Link>
							{page && (
								<div className="flex items-center">
									<div
										className={`relative h-28 flex items-center justify-end border-r mr-4 sm:mr-0 transition-all duration-1000 ease-in-out border-${color}`}
									>
										<a
											href="#"
											className={`text-${color} mr-4 sm:mr-8 text-sm sm:text-base hover:font-normal transition-all duration-1000 ease-in-out`}
											onClick={() => saveLang()}
										>
											{spanish ? "ENG" : "ES"}
										</a>
										<Button
											text={page.dona}
											variant={menuOpen ? "white" : "greenmain"}
											className="!w-24 sm:!w-32 mr-8 shrink-0 !p-1"
											action={() => navigate("/donar")}
										/>
									</div>
									<HamburgerMenu color={color} />
								</div>
							)}
						</div>
					</header>
					{page && (
						<Menu
							menu={{
								alianzas: page.alianzas,
								articulos: page.articulos,
								banco: page.banco,
								biblioteca: page.biblioteca,
								contacto: page.contacto,
								equipo: page.equipo,
								inicio: page.inicio,
								inversion: page.inversion,
								modelos: page.modelos,
								quienessomos: page.quienessomos,
								vacantes: page.vacantes,
								resultados: page.resultados,
							}}
						/>
					)}
				</>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default Header;
