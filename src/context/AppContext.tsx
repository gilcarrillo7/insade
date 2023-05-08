import axios from "axios";
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";

interface IProps {
	children: boolean | React.ReactNode | React.ReactFragment | React.ReactPortal;
}

interface IContext {
	menuOpen: boolean;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
	spanish: boolean;
	setSpanish: Dispatch<SetStateAction<boolean>>;
	baseUrl: string;
	layoutData: any;
}

const AppContext = createContext<IContext>({
	menuOpen: false,
	setMenuOpen: () => {},
	spanish: true,
	setSpanish: () => {},
	baseUrl: "https://insade.mx/wp/wp-json/wp/v2",
	layoutData: null,
});

const { Provider } = AppContext;

const AppProvider = (props: IProps) => {
	const baseUrl = "https://insade.mx/wp/wp-json/wp/v2";
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [spanish, setSpanish] = useState<boolean>(true);
	const [layoutData, setLyoutData] = useState<any>(null);

	useEffect(() => {
		const spanishLs = localStorage.getItem("langSpanish");
		setSpanish(spanishLs === "false" ? false : true);
	}, []);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`${baseUrl}/pages?slug=header&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/pages?slug=header-en&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/pages?slug=footer&timestamp=${new Date().getTime()}`
				),
				axios.get(
					`${baseUrl}/pages?slug=footer-en&timestamp=${new Date().getTime()}`
				),
			])
			.then((res) => {
				setLyoutData({
					header: { es: res[0].data[0].acf, en: res[1].data[0].acf },
					footer: { es: res[2].data[0].acf, en: res[3].data[0].acf },
				});
			})
			.catch((_error) => {});
	}, []);

	return (
		<Provider
			value={{
				menuOpen,
				setMenuOpen,
				spanish,
				setSpanish,
				baseUrl,
				layoutData,
			}}
		>
			{props.children}
		</Provider>
	);
};

export { AppContext, AppProvider };
