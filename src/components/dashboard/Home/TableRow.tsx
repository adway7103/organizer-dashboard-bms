// import img from '../../../../public/dashboard/image.png'
const TableRow: React.FC<any> = ({
  event,
  img,
  date,
  venueAddress,
  // totalTicket,
  // amount,
  //   stdout,
}) => {
  return (
    <tr className=" border-b border-b-black">
      <th scope="row" className="py-4 font-medium text-gray-900 flex gap-2">
        <img
          src={img}
          alt="random"
          className="size-12 object-cover rounded-full"
        />
        <div>
          <h1 className="font-semibold">{event}</h1>
          {/* <p className="text-xs text-gray-800">event info</p> */}
        </div>
        {/* {event} */}
      </th>
      <td className="px-6">{date}</td>
      <td className="px-6">{venueAddress}</td>
    </tr>
  );
};

export default TableRow;
