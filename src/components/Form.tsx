import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export const Label = ({ children, ...props }: ComponentPropsWithoutRef<"label">) => (
	<label {...props} className="block">
		{children}
	</label>
);

export const Input = (props: ComponentPropsWithoutRef<"input">) => (
	<input
		{...props}
		className={clsx(
			"w-full max-w-sm p-2 leading-none border-2 rounded outline-none focus:border-amber-400",
			props.className,
		)}
	/>
);

export const Textarea = (props: ComponentPropsWithoutRef<"textarea">) => (
	<textarea
		{...props}
		className={clsx(
			"w-full max-w-sm p-2 border-2 rounded outline-none focus:border-amber-400",
			props.className,
		)}
	/>
);
