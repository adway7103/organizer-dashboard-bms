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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { fetchTickets } from "../../api/fetchTickets";
import { IoTicketOutline } from "react-icons/io5";
import FormDialog from "./Dialog";
import { useParams } from "react-router-dom";

export type Follower = {
  id: string;
  name: string;
  price: string;
  totalTickets: string;
  matrixId: string;
  eventId: string;
};

export function TicketTable() {
  const { eventId } = useParams();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tickets, setTickets] = React.useState<Follower[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTickets({ eventId });
      const matrixId = response.data.matrix._id;
      const transformedData = response.data.matrix.ticketCategories.map(
        (ticket: any) => ({
          id: ticket._id,
          name: ticket.categoryName,
          price: ticket.categoryPricePerPerson
            ? `$ ${ticket.categoryPricePerPerson}`
            : "Free",
          totalTickets: ticket.totalSeats.toString(),
          matrixId: matrixId,
          eventId: eventId,
        })
      );
      setTickets(transformedData);
    };
    fetchData();
  }, []);

  const handleDeleteTicket = (id: string) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  const columns: ColumnDef<Follower>[] = [
    {
      accessorKey: "name",
      header: "Ticket Name",
      cell: ({ row }) => (
        <div className="text-black">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-black">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "totalTickets",
      header: "Total Tickets",
      cell: ({ row }) => (
        <div className="text-black">{row.getValue("totalTickets")}</div>
      ),
    },
    {
      accessorKey: "*",
      header: "",
      cell: ({ row }) => (
        <div>
          <FormDialog
            id={row.original.id}
            matrixId={row.original.matrixId}
            eventId={eventId}
            onDelete={handleDeleteTicket}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tickets,
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
    <div className="min-w-[300px] w-full">
      <div className="rounded-3xl px-6">
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
                    className="border-b border-gray-300 last:border-b-0"
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
                    <IoTicketOutline className="text-9xl opacity-20" />
                    <p className="font-light pt-2">
                      You don't seem to have any bookings
                    </p>{" "}
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
