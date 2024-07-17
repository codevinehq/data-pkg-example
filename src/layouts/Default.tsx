import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { notesQueries } from "../api/note/hooks";
import { Notes } from "../api/note/schema";

const getNotesCount = (notes: Notes) => notes.length;

export const DefaultLayout = () => {
  const { data: notesCount } = useQuery({
    ...notesQueries.getAll({}),
    select: getNotesCount,
  });
  return (
    <div className="space-y-8">
      <div className="bg-slate-900">
        <ul className="container flex items-center gap-6 p-4 m-auto text-white">
          <li>
            <Link className="hover:underline underline-offset-2" to="/">
              Notes ({notesCount})
            </Link>
          </li>
          <li>
            <Link className="hover:underline underline-offset-2" to="/create">
              New Note
            </Link>
          </li>
        </ul>
      </div>
      <div className="container p-4 m-auto ">
        <Outlet />
      </div>
    </div>
  );
};
