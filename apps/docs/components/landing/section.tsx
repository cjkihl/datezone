import type React from "react";

const Section = ({
	className,
	id,
	customPaddings,
	children,
}: {
	className: string;
	id: string;
	customPaddings: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={`
      relative
      ${customPaddings || "py-10 lg:py-16"}
      ${className || " "}`}
			id={id}
		>
			{children}
		</div>
	);
};

export default Section;
