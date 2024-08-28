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

interface FollowerTableProps {
  name: string;
  lname: string;
  age: number;
  email: string;
  followedOn: string;
  eventsAttended: number;
  affiliationStatus: string;
}

export function FollowerTable({
  name,
  lname,
  age,
  email,
  followedOn,
  eventsAttended,
  affiliationStatus,
}: FollowerTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "fname",
      header: "Name",
      cell: () => <div>{name}</div>,
    },
    {
      accessorKey: "lname",
      header: "Last Name",
      cell: () => <div>{lname}</div>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: () => <div>{age}</div>,
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: () => <div>{email}</div>,
    },
    {
      accessorKey: "followedOn",
      header: "Followed On",
      cell: () => <div>{followedOn}</div>,
    },
    {
      accessorKey: "eventsAttended",
      header: "Events Attended",
      cell: () => <div>{eventsAttended}</div>,
    },
    {
      accessorKey: "affiliationStatus",
      header: "Affiliation Status",
      cell: () => <div>{affiliationStatus}</div>,
    },
  ];

  const data = [{ name, lname, age, email, followedOn, eventsAttended, affiliationStatus }];

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
    <div className="mt-6">
      <h3 className="text-2xl font-medium px-4">Followers List</h3>
      <div className="border border-gray-300 rounded-3xl lg:px-6 mt-4">
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center p-2 px-4 gap-4 sm:gap-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-4 text-gray-400 pointer-events-none" />
            <input
              value={(table.getColumn("fname")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("fname")?.setFilterValue(event.target.value)}
              className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
              placeholder="Search"
            />
          </div>
          <div className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-4 sm:gap-1 lg:gap-4">
            <button className="flex items-center gap-2 sm:gap-5 px-4 py-2 bg-[#E6E6E682] rounded-full">
              Export
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.875 8.75V16.25C16.875 16.5815 16.7433 16.8995 16.5089 17.1339C16.2745 17.3683 15.9565 17.5 15.625 17.5H4.375C4.04348 17.5 3.72554 17.3683 3.49112 17.1339C3.2567 16.8995 3.125 16.5815 3.125 16.25V8.75C3.125 8.41848 3.2567 8.10054 3.49112 7.86612C3.72554 7.6317 4.04348 7.5 4.375 7.5H6.25C6.41576 7.5 6.57473 7.56585 6.69194 7.68306C6.80915 7.80027 6.875 7.95924 6.875 8.125C6.875 8.29076 6.80915 8.44974 6.69194 8.56695C6.57473 8.68416 6.41576 8.75 6.25 8.75H4.375V16.25H15.625V8.75H13.75C13.5842 8.75 13.4253 8.68416 13.3081 8.56695C13.1908 8.44974 13.125 8.29076 13.125 8.125C13.125 7.95924 13.1908 7.80027 13.3081 7.68306C13.4253 7.56585 13.5842 7.5 13.75 7.5H15.625C15.9565 7.5 16.2745 7.6317 16.5089 7.86612C16.7433 8.10054 16.875 8.41848 16.875 8.75Z"
                  fill="#333333"
                />
                <path
                  d="M8.88477 10.0652C8.75416 9.93386 8.68611 9.75456 8.69655 9.57031C8.70699 9.38607 8.79499 9.21469 8.93898 9.09692C9.08297 8.97916 9.27089 8.92577 9.45798 8.94808C9.64507 8.9704 9.81262 9.06691 9.92852 9.21875L10.625 10.0703V3.75C10.625 3.58424 10.6908 3.42527 10.8081 3.30806C10.9253 3.19085 11.0842 3.125 11.25 3.125C11.4158 3.125 11.5747 3.19085 11.6919 3.30806C11.8092 3.42527 11.875 3.58424 11.875 3.75V10.0703L12.5715 9.21875C12.6874 9.06691 12.8549 8.9704 13.042 8.94808C13.2291 8.92577 13.417 8.97916 13.561 9.09692C13.705 9.21469 13.793 9.38607 13.8034 9.57031C13.8139 9.75456 13.7458 9.93386 13.6152 10.0652L11.1152 12.5652C11.0516 12.6297 10.9764 12.6815 10.8938 12.7175C10.8113 12.7536 10.7224 12.7731 10.632 12.775C10.5428 12.7733 10.4545 12.7546 10.3733 12.7199C10.2921 12.6853 10.2194 12.6356 10.1598 12.573C10.1554 12.5684 10.1511 12.5638 10.1468 12.5592L8.88477 10.0652Z"
                  fill="#333333"
                />
              </svg>
            </button>
            <Select
              defaultValue={1}
              style={{ height: 48, width: 125, borderRadius: 999 }}
            >
              <MenuItem value={1}>Sort By</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No followers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
