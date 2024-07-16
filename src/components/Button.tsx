import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

const styles =
  "rounded bg-amber-400  text-slate-900 py-2 px-4 hover:bg-amber-500 transition-colors font-semibold";

export const Button = (props: ComponentPropsWithoutRef<"button">) => (
  <button {...props} className={styles} />
);

export const ButtonLink = (props: ComponentPropsWithoutRef<typeof Link>) => (
  <Link {...props} className={styles} />
);
