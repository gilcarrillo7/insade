import React, { useContext, useEffect, useState } from "react";

import IG from "../../images/footer/ig.svg";
import LI from "../../images/footer/li.svg";
import YT from "../../images/footer/yt.svg";
import TW from "../../images/footer/tw.svg";
import FB from "../../images/footer/fb.svg";
import IG2 from "../../images/footer/ig2.svg";
import LI2 from "../../images/footer/li2.svg";
import YT2 from "../../images/footer/yt2.svg";
import TW2 from "../../images/footer/tw2.svg";
import FB2 from "../../images/footer/fb2.svg";
import { Link } from "gatsby";
import { AppContext } from "../../context/AppContext";

interface IProps {
	className?: string;
}

const Footer = ({ className = "" }: IProps) => {
	const { spanish, layoutData } = useContext(AppContext);

	const [page, setPage] = useState<any>(null);

	useEffect(() => {
		if (layoutData !== null) {
			if (spanish) setPage(layoutData.footer.es);
			else setPage(layoutData.footer.en);
		}
	}, [spanish, layoutData]);

	const [img1, setImg1] = useState(IG);
	const [img2, setImg2] = useState(LI);
	const [img3, setImg3] = useState(YT);
	const [img4, setImg4] = useState(TW);
	const [img5, setImg5] = useState(FB);
	return (
		<footer
			className={`z-20 bg-white text-sm text-gray font-light border-t border-t-gray
			${className}
		`}
		>
			{page && (
				<div className="container py-6 flex flex-col lg:flex-row justify-between items-center">
					<div className="flex lg:order-2 mb-2 lg:mb-0">
						<a className="" href={page.instagram} target="_blank">
							<img
								src={img1}
								onMouseOver={() => setImg1(IG2)}
								onMouseLeave={() => setImg1(IG)}
								alt="instagram"
								className=""
							/>
						</a>
						<a className="" href={page.linkedin} target="_blank">
							<img
								src={img2}
								onMouseOver={() => setImg2(LI2)}
								onMouseLeave={() => setImg2(LI)}
								alt="linkedin"
								className=""
							/>
						</a>
						<a className="" href={page.youtube} target="_blank">
							<img
								src={img3}
								onMouseOver={() => setImg3(YT2)}
								onMouseLeave={() => setImg3(YT)}
								alt="youtube"
								className=""
							/>
						</a>
						<a className="" href={page.twitter} target="_blank">
							<img
								src={img4}
								onMouseOver={() => setImg4(TW2)}
								onMouseLeave={() => setImg4(TW)}
								alt="twitter"
								className=""
							/>
						</a>
						<a className="" href={page.facebook} target="_blank">
							<img
								src={img5}
								onMouseOver={() => setImg5(FB2)}
								onMouseLeave={() => setImg5(FB)}
								alt="facebook"
								className=""
							/>
						</a>
					</div>
					<p className="lg:order-1 text-center mb-2 lg:mb-0 w-full lg:w-auto">
						©{new Date().getFullYear()} {page.footertext}{" "}
						<span className="hidden sm:inline">|</span>{" "}
						<br className="block sm:hidden" />
						<Link
							to="/aviso"
							className="underline sm:no-underline	hover:underline"
						>
							{page.avisotext}
						</Link>
					</p>
					<p className="lg:order-3 text-center mb-2 lg:mb-0 w-full lg:w-auto">
						{spanish
							? "Diseño y desarrollo web por "
							: "Designed and developed by  "}
						<a
							href="https://www.trazovivo.com"
							className="underline"
							target="_blank"
						>
							Trazo Vivo
						</a>
					</p>
				</div>
			)}
		</footer>
	);
};

export default Footer;
