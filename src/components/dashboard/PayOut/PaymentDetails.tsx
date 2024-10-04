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
import AddPaymentMethod from "./AddPaymentMethod";
import { fetchPaymentDetails } from "../../../api/fetchPaymentDetailsApi";
import Options from "./Options";

type TableType = {
  _id: string;
  sNo: string;
  accountHolderFullName: string;
  ifscCode: string;
  accountNumber: string;
};

export function PaymentDetails() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [paymenetMethodData, setPaymentMethodData] = React.useState<
    TableType[]
  >([]);

  const fetchData = async () => {
    const response = await fetchPaymentDetails();
    setPaymentMethodData(response);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnDef<TableType>[] = [
    {
      accessorKey: "sNo",
      header: "S. No",
      cell: ({ row }) => <div className="">{row.index + 1}</div>,
    },
    {
      accessorKey: "accountHolderFullName",
      header: "Name",
      cell: ({ row }) => (
        <div className="">{row.getValue("accountHolderFullName")}</div>
      ),
    },
    {
      accessorKey: "ifscCode",
      header: "IFSC Code",
      cell: ({ row }) => <div className="">{row.getValue("ifscCode")}</div>,
    },
    {
      accessorKey: "accountNumber",
      header: "Account number",
      cell: ({ row }) => (
        <div className="">{row.getValue("accountNumber")}</div>
      ),
    },
    {
      accessorKey: "*",
      header: "",
      cell: ({ row }) => (
        <div className="">
          <Options id={row.original._id} refetch={fetchData} />
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: paymenetMethodData,
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
      <div className="m-10">
        <div className="flex justify-between items-center p-4 gap-4">
          <h3 className="text-[1.6rem] lg:text-[2rem] font-medium">
            Payment methods
          </h3>

          <AddPaymentMethod refetch={fetchData} />
        </div>
        <div className="border border-gray-300 rounded-3xl px-6 mt-2">
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
            <div className="relative flex items-center w-full sm:w-auto">
              <Search className="absolute left-4 text-gray-400 pointer-events-none" />
              <input
                value={
                  (table
                    .getColumn("accountHolderFullName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("accountHolderFullName")
                    ?.setFilterValue(event.target.value)
                }
                className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
                placeholder="Search"
              />
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
    </div>
  );
}
