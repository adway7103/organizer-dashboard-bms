import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/Table";
import { MenuItem, Select } from "@mui/material";
import PaymentMethodDetails from "./PaymentMethodDetails";

const data: TableType[] = [
  {
    sNo: "1",
    name: "Christein Robertson",
    ifscCode: "VErV3284098809821",
    accountNumber: "511266221287765",
  },
  {
    sNo: "2",
    name: "Christein Robertson",
    ifscCode: "VErV3284098809821",
    accountNumber: "511266221287765",
  },
  {
    sNo: "3",
    name: "Christein Robertson",
    ifscCode: "VErV3284098809821",
    accountNumber: "511266221287765",
  },
  {
    sNo: "4",
    name: "Christein Robertson",
    ifscCode: "VErV3284098809821",
    accountNumber: "511266221287765",
  },
  {
    sNo: "5",
    name: "Christein Robertson",
    ifscCode: "VErV3284098809821",
    accountNumber: "511266221287765",
  },
];

export type TableType = {
  sNo: string;
  name: string;
  ifscCode: string;
  accountNumber: string;
};

export const columns: ColumnDef<TableType>[] = [
  {
    accessorKey: "sNo",
    header: "S. No",
    cell: ({ row }) => <div className="">{row.getValue("sNo")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "ifscCode",
    header: "IFSC Code",
    cell: ({ row }) => <div className="">{row.getValue("ifscCode")}</div>,
  },
  {
    accessorKey: "accountNumber",
    header: "Account number",
    cell: ({ row }) => <div className="">{row.getValue("accountNumber")}</div>,
  },
  {
    accessorKey: "*",
    header: "*",
    cell: () => (
      <div className="">
        <svg
          className="h-6 w-6 text-slate-900"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    ),
  },
];

export function PaymentDetails() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showPaymentMethodDetails, setShowPaymentMethodDetails] =
    React.useState(false);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,

      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {showPaymentMethodDetails ? (
        <PaymentMethodDetails />
      ) : (
        <div className="m-10">
       
          <div className="flex justify-between items-center p-4 gap-4">
            <h3 className="text-[1.6rem] lg:text-[2rem] font-semibold">
              Payment methods
            </h3>
            <button
              onClick={() => setShowPaymentMethodDetails(true)}
               className="text-xs sm:text-sm md:text-base px-4 bg-yellow-600 border-none rounded-full p-2 text-center font-medium h-12 sm:h-12 md:h-14 w-48 md:w-58 sm:w-48"
            >
              Add payment method
            </button>
          </div>
          <div className="border border-gray-300 rounded-3xl px-6 mt-2">
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
              <div className="relative flex items-center w-full sm:w-auto">
                <Search className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  value={
                    (table
                      .getColumn("name")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("name")
                      ?.setFilterValue(event.target.value)
                  }
                  className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
                  placeholder="Search"
                />
              </div>
              <div className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-4 sm:gap-1 lg:gap-4">
                <span>Show</span>

                <Select
                  defaultValue={20}
                  size="small"
                  className="block md:hidden lg:block"
                  sx={{
                    backgroundColor: "#E6E6E682",
                    paddingX: 2,
                    borderRadius: 6,
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                </Select>
              </div>
            </div>
            <div className="p-4">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
