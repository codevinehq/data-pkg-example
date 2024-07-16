import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import { Link as RRLink } from "react-router-dom";

interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({ level, ...props }: HeadingProps) => {
  const Tag = `h${level}` as const;
  const levels: Record<HeadingProps["level"], string> = {
    1: "text-2xl md:text-4xl",
    2: "text-xl md:text-2xl",
    3: "text-lg md:text-xl",
    4: "text-base md:text-lg",
    5: "text-base md:text-lg",
    6: "text-base md:text-lg",
  };

  return <Tag {...props} className={clsx("font-semibold", levels[level])} />;
};

export const Link = (props: ComponentPropsWithoutRef<typeof RRLink>) => (
  <RRLink
    {...props}
    className="text-amber-500 hover:underline underline-offset-2"
  />
);
