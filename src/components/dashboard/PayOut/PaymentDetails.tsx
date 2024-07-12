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
          <div className="flex justify-between ">
            <h3 className="text-2xl font-semibold px-4">Payment methods</h3>
            <button
              onClick={() => setShowPaymentMethodDetails(true)}
              className="text-base px-4 bg-yellow-600 border-none rounded-full p-2 text-center font-medium w-48"
            >
              Add payment method
            </button>
          </div>
          <div className="border border-gray-300 rounded-3xl px-6 mt-4">
            <div className="mt-4 flex w-full justify-between items-center p-2 px-4">
              <div className="relative w-1/2 flex items-center">
                <Search className="absolute left-6 size-5 text-gray-400 pointer-events-none" />
                <input
                  value={
                    (table
                      .getColumn("eventName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("eventName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="!pl-14 !h-12 !rounded-full !bg-[#E6E6E682] max-w-sm w-80 py-3 pl-[20px] border-none"
                  placeholder="Search"
                />
              </div>
              <div className="flex w-1/2 items-center justify-end gap-6 md:gap-10 ">
                

                <span>Show</span>

                <Select
                  defaultValue={5}
                  size="small"
                  sx={{
                    backgroundColor: "#E6E6E682",
                    paddingX: 2,
                    borderRadius: 6,
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
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
