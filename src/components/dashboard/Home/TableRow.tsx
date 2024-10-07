const TableRow: React.FC<any> = ({ event, img, date, venueAddress }) => {
  return (
    <tr className=" border-b border-b-black">
      <th
        scope="row"
        className="py-4 items-center font-medium text-gray-900 gap-2"
      >
        <div className="flex justify-ccenter items-center gap-2">
          <img
            src={img}
            alt="random"
            className="size-12 object-cover rounded-full"
          />
          <h1 className="font-semibold hover:line-clamp-none line-clamp-2 leading-tight">
            {event}
          </h1>
        </div>
      </th>
      <td className="px-6">{date}</td>
      <td className="px-6 pt-4 hover:line-clamp-none line-clamp-2">
        {venueAddress}
      </td>
    </tr>
  );
};

export default TableRow;
