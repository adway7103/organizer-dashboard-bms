import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  //   getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/Table";
import { useParams } from "react-router-dom";
// import GuestListDialog from "./GuestListOptions";
import NewGuestlist from "./NewGuestlist";
import { fetchGuests } from "../../../../api/fetchGuests";
// import { Search } from "lucide-react";

export type GuestList = {
  id: string;
  name: string;
  noOfTickets: string;
};

export default function GuestList() {
  const { eventId } = useParams<{ eventId: string }>();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [guests, setGuests] = React.useState<GuestList[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchGuests({ eventId });
      const transformedData = data.map((guest: any) => ({
        id: guest._id,
        name: `${guest.fname} ${guest.lname}`,
        noOfTickets: guest.noOfTickets,
      }));
      setGuests(transformedData);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  //   const handleDeleteTicket = (id: string) => {
  //     setGuests((prevTickets) => prevTickets.filter((guest) => guest.id !== id));
  //   };
  const columns: ColumnDef<GuestList>[] = [
    {
      accessorKey: "name",
      header: "Guest list name",
      cell: ({ row }) => (
        <div className="text-black text-center">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "noOfTickets",
      header: "No. of tickets",
      cell: ({ row }) => (
        <div className="text-black ">{row.getValue("noOfTickets")}</div>
      ),
    },
    // {
    //   accessorKey: "eventId",
    //   header: "",
    //   cell: ({ row }) => (
    //     <div className="pr-10"
    //       <GuestListDialog
    //         eventId={eventId}
    //         id={row.original.id}
    //         onDelete={handleDeleteTicket}
    //       />
    //     </div>
    //   ),
    // },
  ];

  const table = useReactTable({
    data: guests,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
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
    <div className="min-w-[300px] w-full p-2 sm:p-4">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">Rhythms Live</h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-xl font-medium ml-9">Guest List</h1>
        <NewGuestlist refetch={fetchData} />
      </div>{" "}
      <div className="rounded-3xl px-6 border-2 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center lg:p-2 lg:px-4 gap-4 sm:gap-0">
          {/* <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-4 text-gray-400 pointer-events-none" />
            <input
              value={
                (table.getColumn("fName")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("fName")?.setFilterValue(event.target.value)
              }
              className="w-full sm:w-auto !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm lg:w-80"
              placeholder="Search"
            />
          </div> */}
          {/* <div className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-4 sm:gap-1 lg:gap-4"> */}
          {/* <button className="flex items-center gap-2 sm:gap-5 px-4 py-2 bg-[#E6E6E682] rounded-full">
              Export
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.875 8.75V16.25C16.875 16.5815 16.7433 16.8995 16.5089 17.1339C16.2745 17.3683 15.9565 17.5 15.625 17.5H4.375C4.04348 17.5 3.72554 17.3683 3.49112 17.1339C3.2567 16.8995 3.125 16.5815 3.125 16.25V8.75C3.125 8.41848 3.2567 8.10054 3.49112 7.86612C3.72554 7.6317 4.04348 7.5 4.375 7.5H6.25C6.41576 7.5 6.57473 7.56585 6.69194 7.68306C6.80915 7.80027 6.875 7.95924 6.875 8.125C6.875 8.29076 6.80915 8.44974 6.69194 8.56695C6.57473 8.68416 6.41576 8.75 6.25 8.75H4.375V16.25H15.625V8.75H13.75C13.5842 8.75 13.4253 8.68416 13.3081 8.56695C13.1908 8.44974 13.125 8.29076 13.125 8.125C13.125 7.95924 13.1908 7.80027 13.3081 7.68306C13.4253 7.56585 13.5842 7.5 13.75 7.5H15.625C15.9565 7.5 16.2745 7.6317 16.5089 7.86612C16.7433 8.10054 16.875 8.41848 16.875 8.75ZM7.31719 5.44219L9.375 3.3836V10.625C9.375 10.7908 9.44085 10.9497 9.55806 11.0669C9.67527 11.1842 9.83424 11.25 10 11.25C10.1658 11.25 10.3247 11.1842 10.4419 11.0669C10.5592 10.9497 10.625 10.7908 10.625 10.625V3.3836L12.6828 5.44219C12.8001 5.55947 12.9591 5.62535 13.125 5.62535C13.2909 5.62535 13.4499 5.55947 13.5672 5.44219C13.6845 5.32492 13.7503 5.16586 13.7503 5C13.7503 4.83415 13.6845 4.67509 13.5672 4.55782L10.4422 1.43282C10.3841 1.37471 10.3152 1.32861 10.2393 1.29715C10.1635 1.2657 10.0821 1.24951 10 1.24951C9.91787 1.24951 9.83654 1.2657 9.76066 1.29715C9.68479 1.32861 9.61586 1.37471 9.55781 1.43282L6.43281 4.55782C6.31554 4.67509 6.24965 4.83415 6.24965 5C6.24965 5.16586 6.31554 5.32492 6.43281 5.44219C6.55009 5.55947 6.70915 5.62535 6.875 5.62535C7.04085 5.62535 7.19991 5.55947 7.31719 5.44219Z"
                  fill="#5F5F5F"
                  fillOpacity="0.66"
                />
              </svg>
            </button> */}
          {/* </div> */}
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
            <TableBody className="space-y-2">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-300 last:border-b-0 shadow-lg"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-black">
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
                    className="h-24 text-center text-black"
                  >
                    <p className="font-light pt-2">No guestlist available</p>{" "}
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
