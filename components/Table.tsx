"use client";
import { linkType } from "@/server/schema";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import useSWR, { useSWRConfig } from "swr";
import UpdateModal from "./UpdateModal";
const columnHelper = createColumnHelper<linkType>();

const columns = [
  columnHelper.accessor("uid", {
    header: (info) => <h1>link</h1>,
    cell: (info) => (
      <Link
        className="hover:underline"
        target="_blank"
        href={`/${info.getValue()}`}
      >{`/${info.getValue()}`}</Link>
    ),
  }),
  columnHelper.accessor("url", {
    header: (info) => <h1>url</h1>,
    cell: (info) => (
      <Link
        className="hover:underline"
        target="_blank"
        href={`${info.getValue()}`}
      >{`${info.getValue()}`}</Link>
    ),
  }),
  columnHelper.accessor("id", {
    header: (info) => <h1>update</h1>,
    cell: (info) => {
      return (
        <UpdateModal
          {...info.table.getRowModel().rowsById[info.row.index].original}
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    header: (info) => <h1>delete</h1>,
    cell: (info) => (
      <button className="btn btn-sm btn-error">
        <RiDeleteBin6Line />
      </button>
    ),
  }),
];
// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
const DataTable: React.FC = () => {
  const [t_data, setData] = useState<linkType[]>([]);
  const { isLoading, error } = useSWR("/api/data/1", fetcher, {
    onSuccess(data, key, config) {
      setData(data.data);
      console.log("data", data);
    },
  });
  const table = useReactTable({
    data: t_data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto p-2">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
