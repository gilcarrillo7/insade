import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const ImageApi = ({
	id,
	alt,
	className,
	myRef,
}: {
	id: number;
	alt: string;
	className: string;
	myRef?: (node?: Element | null | undefined) => void;
}) => {
	const { baseUrl } = useContext(AppContext);
	const [url, setUrl] = useState("");
	useEffect(() => {
		if (id !== 0)
			axios
				.get(`${baseUrl}/media/${id}`)
				.then((res) => setUrl(res.data.guid.rendered))
				.catch((_error) => {});
	}, [id, baseUrl]);
	return (
		<>
			{url !== "" && (
				<img ref={myRef} src={url} alt={alt} className={className} />
			)}
		</>
	);
};

export default ImageApi;
