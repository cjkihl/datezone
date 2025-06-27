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

			<div className="hidden absolute top-0 left-5 w-[0.0625rem] h-[calc(100%_+_30px)] dark:bg-[#26242C] bg-stone-200  pointer-events-none lg:block lg:left-16 xl:left-16" />
			<div className="hidden absolute top-0 right-5 w-[0.0625rem] h-[calc(100%_+_30px)]  dark:bg-[#26242C] bg-stone-200  pointer-events-none lg:block lg:right-14 xl:right-14" />
		</div>
	);
};

export default Section;
