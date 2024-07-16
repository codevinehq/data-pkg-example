import { ComponentPropsWithoutRef } from "react";

export const Label = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"label">) => (
  <label {...props} className="block">
    {children}
  </label>
);

export const Input = (props: ComponentPropsWithoutRef<"input">) => (
  <input
    {...props}
    className="border-2 rounded max-w-sm w-full p-2 leading-none"
  />
);

export const Textarea = (props: ComponentPropsWithoutRef<"textarea">) => (
  <textarea {...props} className="border-2 rounded max-w-sm w-full p-2" />
);
