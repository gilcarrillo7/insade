import React, { useContext } from "react";
import { navigate, Link } from "gatsby";
import { AppContext } from "../../context/AppContext";

const Option = ({
	text,
	link,
	className = "",
}: {
	text: string;
	link: string;
	className?: string;
}) => {
	const { setMenuOpen } = useContext(AppContext);
	return (
		<Link
			className={`hover:font-medium mb-2 md:mb-6 ${className}`}
			onClick={() => {
				setMenuOpen(false);
			}}
			to={link}
		>
			{text}
		</Link>
	);
};

const Menu = ({
	menu,
}: {
	menu: {
		alianzas: string;
		articulos: string;
		banco: string;
		biblioteca: string;
		contacto: string;
		equipo: string;
		inicio: string;
		inversion: string;
		modelos: string;
		quienessomos: string;
		vacantes: string;
		resultados: string;
	};
}) => {
	const { menuOpen } = useContext(AppContext);
	return (
		<div
			className={`fixed bg-greensecond w-screen h-screen z-40 left-0 top-0 flex items-center transition-all duration-1000 ease-in-out ${
				menuOpen ? "opacity-100" : "opacity-0 translate-x-[100%]"
			}`}
		>
			<div className="container text-white text-xl sm:text-3xl lg:text-4xl font-light flex flex-col items-center justify-center">
				<div className="w-full">
					<div className="mt-4 sm:mt-[120px] w-full flex sm:justify-center">
						<div className="w-full flex flex-col sm:flex-row justify-between">
							<div className="flex flex-col">
								<Option link="/" text={menu.inicio} />
								<Option text={menu.quienessomos} link="/quienes_somos" />
								<Option text={menu.equipo} link="/equipo" />
								<Option text={menu.modelos} link="/#modelosIntervencion" />
							</div>
							<div className="flex flex-col lg:min-w-[500px]">
								<Option text={menu.resultados} link="/#resultados" />
								<Option text={menu.alianzas} link="/#alianzas" />
								<Option text={menu.articulos} link="/articulos" />
								<Option text={menu.banco} link="/banco_noticias" />
							</div>
						</div>
					</div>
					<div className="flex flex-wrap justify-between text-base sm:text-2xl mt-20 sm:mt-24">
						<Option
							text={menu.inversion}
							link="/inversion-social"
							className="flex w-1/2 md:w-auto shrink-0 md:order-1"
						/>
						<Option
							text={menu.biblioteca}
							link="/biblioteca"
							className="flex w-1/2 md:w-auto shrink-0 justify-end md:order-3"
						/>
						<Option
							text={menu.vacantes}
							link="/vacantes"
							className="flex w-1/2 md:w-auto shrink-0 md:order-2"
						/>
						<Option
							text={menu.contacto}
							link="/contacto"
							className="flex w-1/2 md:w-auto shrink-0 justify-end md:order-4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
