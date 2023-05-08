import React from "react";

interface IProps {
	text: string;
	variant: string;
	action?: () => void;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit" | "reset";
}

const Button = ({
	text,
	action,
	disabled,
	className,
	variant,
	type,
}: IProps) => {
	return (
		<>
			{variant === "greenmain" && (
				<button
					className={`w-full font-light hover:font-normal sm:w-48 bg-greenmain border-solid border border-greenmain sm:text-xl p-2 text-white hover:text-white ${
						className ? className : ""
					}`}
					onClick={action}
					type={type ? type : "button"}
					disabled={disabled}
				>
					{text}
				</button>
			)}
			{variant === "white" && (
				<button
					className={`w-full font-light hover:font-normal sm:w-48 bg-transparent border-solid border border-white sm:text-xl p-2 text-white hover:text-white ${
						className ? className : ""
					}`}
					onClick={action}
					type={type ? type : "button"}
					disabled={disabled}
				>
					{text}
				</button>
			)}
			{variant === "whitefile" && (
				<button
					className={`w-full text-center font-light hover:font-normal sm:w-48 bg-greensecond hover:bg-greenmain border-solid border border-white sm:text-xl p-2 text-white hover:text-white hover:border-greenmain ${
						className ? className : ""
					}`}
					onClick={action}
					type={type ? type : "button"}
				>
					{text}
				</button>
			)}
		</>
	);
};

export default Button;
