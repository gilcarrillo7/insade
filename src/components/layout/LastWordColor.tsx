import React from "react";

const LastWordColor = ({
	text,
	mainColor,
	lastColor,
}: {
	text: string;
	mainColor: string;
	lastColor: string;
}) => {
	const size = text ? text.split(" ").length : 0;
	return (
		<p className={mainColor}>
			{text &&
				text
					.split(" ")
					.map((word, i) => (
						<React.Fragment key={`title${word}${i}`}>
							{i > size / 2 - 1 ? (
								<span className={lastColor}>{word} </span>
							) : (
								<>{`${word} `}</>
							)}
						</React.Fragment>
					))}
		</p>
	);
};

export default LastWordColor;
