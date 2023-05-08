import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

import Layout from "../components/layout/Layout";
import Button from "../components/shared/Button";
import { SEO } from "../components/layout/SEO";
import { AppContext } from "../context/AppContext";
import LoaderApi from "../components/shared/LoaderApi";

const convertJsontoUrlencoded = (obj: any) => {
	let str = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		}
	}
	return str.join("&");
};

const ContactoPage = () => {
	const { spanish, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/pages?slug=contacto-en,contacto&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setData({
					es: res.data.find((page: any) => page.slug === "contacto").acf,
					en: res.data.find((page: any) => page.slug === "contacto-en").acf,
				});
			})
			.catch((_error) => {});
	}, [baseUrl]);

	useEffect(() => {
		if (data)
			if (spanish) setPage(data.es);
			else setPage(data.en);
	}, [spanish, data]);

	const [form, setForm] = useState({ name: "", email: "" });
	const [errorFormName, setErrorFormName] = useState("");
	const [errorFormMail, setErrorFormMail] = useState("");
	const [errorFormMsj, setErrorFormMsj] = useState("");
	const [loading, setLoading] = useState(false);
	const [formMessage, setFormMessage] = useState("");
	const comment: any = useRef(null);

	const TOKEN = "";

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setErrorFormName("");
		setErrorFormMail("");
		setErrorFormMsj("");
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const sendForm = async (e: any) => {
		let errors = 0;
		e.preventDefault();
		if (form.name.trim() === "") {
			setErrorFormName("Ingresa tu nombre");
			errors++;
		}
		if (form.email.trim() === "") {
			setErrorFormMail("Ingresa tu email");
			errors++;
		} else if (
			!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
		) {
			setErrorFormMail("Ingresa un email correcto");
			errors++;
		}
		if (comment!.current!.innerText.trim() === "") {
			setErrorFormMsj("Ingresa tu mensaje");
			errors++;
		}
		if (errors === 0) {
			setLoading(true);
			try {
				await axios({
					url: `https://insade.mx/wp/wp-json/contact-form-7/v1/contact-forms/1074/feedback`,
					headers: {
						Authorization: `Basic ${TOKEN}`,
						"Content-Type": "multipart/form-data; charset=utf-8",
						Accept: "application/json",
					},
					method: "POST",
					data: {
						"your-subject": "Contacto",
						"your-name": form.name,
						"your-email": form.email,
						"your-message": comment.current.innerText,
					},
				});
				setLoading(false);
				setFormMessage(
					page
						? page.successmsg
						: "Gracias por contactarnos. Tu mensaje ha sido enviado"
				);
				setForm({ name: "", email: "" });
				comment.current.innerText = "";
			} catch (error) {
				setLoading(false);
				setFormMessage(page ? page.errormsg : "Ocurrió un error");
			}
		}
	};

	return (
		<>
			{data ? (
				<Layout>
					<div className="container py-8 sm:py-20">
						<p className="font-semibold text-gray text-3xl sm:text-5xl">
							{page ? page.title : "Escríbenos"}
						</p>

						<form
							className="w-full text-black mt-0 sm:mt-12 my-4"
							onSubmit={(e) => sendForm(e)}
						>
							<div className="sm:grid sm:grid-cols-2 sm:gap-12 text-greenmain">
								<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
									<input
										name="name"
										className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl placeholder:text-greenmain"
										type="text"
										placeholder={page ? page.name : "Nombre"}
										aria-label="Name"
										value={form.name}
										onChange={(e) => handleChanges(e)}
									/>
									<div
										className={`absolute h-px border-b border-gray left-0 bottom-0 transition-all duration-1000 ease-in-out visible w-full`}
									></div>
									{errorFormName !== "" && (
										<div className="absolute left-0 -bottom-6 text-sm text-greenmain">
											{errorFormName}
										</div>
									)}
								</div>
								<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
									<input
										name="email"
										className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl placeholder:text-greenmain"
										type="mail"
										placeholder={page ? page.email : "Email"}
										aria-label="Email"
										value={form.email}
										onChange={(e) => handleChanges(e)}
									/>
									<div
										className={`absolute h-px border-b border-gray left-0 bottom-0 transition-all duration-1000 ease-in-out delay-500 visible w-full`}
									></div>
									{errorFormMail !== "" && (
										<div className="absolute left-0 -bottom-6 text-sm text-greenmain">
											{errorFormMail}
										</div>
									)}
								</div>
							</div>
							<div className="sm:grid sm:grid-cols-2 sm:gap-12 sm:mt-16 ">
								<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
									<span
										ref={comment}
										contentEditable="true"
										className="outline-none w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl"
										placeholder={page ? page.message : "Mensaje"}
										onChange={() => setErrorFormMsj("")}
										onClick={() => setErrorFormMsj("")}
									></span>
									{/*<input
									name="message"
									className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl"
									type="tel"
									placeholder="Mensaje"
									aria-label="Mensaje"
									value={form.message}
									onChange={(e) => handleChanges(e)}
								/>*/}
									<div
										className={`absolute h-px border-b border-gray left-0 bottom-0 transition-all duration-1000 ease-in-out delay-1000 visible w-full`}
									></div>
									{errorFormMsj !== "" && (
										<div className="absolute left-0 -bottom-6 text-sm text-greenmain">
											{errorFormMsj}
										</div>
									)}
								</div>
								<div className="text-center sm:text-left mt-8 sm:mt-4">
									{loading ? (
										<BeatLoader color="#8FB436" />
									) : formMessage === "" ? (
										<Button
											type="submit"
											text={page ? page.button : "Enviar"}
											variant="greenmain"
										/>
									) : (
										<p className="text-lg text-greenmain text-xl">
											{formMessage}
										</p>
									)}
								</div>
							</div>
						</form>
					</div>
				</Layout>
			) : (
				<LoaderApi />
			)}
		</>
	);
};

export default ContactoPage;

export const Head = () => <SEO title="Contacto" />;
