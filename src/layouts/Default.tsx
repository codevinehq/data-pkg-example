import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

export const DefaultLayout = ({
  children,
}: ComponentPropsWithoutRef<"div">) => (
  <div className="space-y-8">
    <div className="bg-slate-900">
      <ul className="container m-auto p-4 flex items-center text-white">
        <li>
          <Link className="hover:underline underline-offset-2" to="/">
            Notes
          </Link>
        </li>
      </ul>
    </div>
    <div className="container m-auto p-4 ">{children}</div>
  </div>
);
