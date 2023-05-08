import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const BgImageApi = ({
	id,
	className,
	children,
}: {
	id: number;
	className: string;
	children: React.ReactNode;
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
				<div
					style={{
						backgroundImage: `url("${url}")`,
					}}
					className={className}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default BgImageApi;
