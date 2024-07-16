import { useQuery } from "@tanstack/react-query";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { notesQueries } from "../api/note/hooks";

export const DefaultLayout = ({
  children,
}: ComponentPropsWithoutRef<"div">) => {
  const { data: notes } = useQuery(notesQueries.getAll({}));
  return (
    <div className="space-y-8">
      <div className="bg-slate-900">
        <ul className="container m-auto p-4 flex items-center text-white gap-6">
          <li>
            <Link className="hover:underline underline-offset-2" to="/">
              Notes ({notes?.length})
            </Link>
          </li>
          <li>
            <Link className="hover:underline underline-offset-2" to="/create">
              New Note
            </Link>
          </li>
        </ul>
      </div>
      <div className="container m-auto p-4 ">{children}</div>
    </div>
  );
};
