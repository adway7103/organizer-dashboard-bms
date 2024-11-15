import TableRow from "./TableRow";

const DTable = ({ data }: any) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full text-sm text-left text-gray-800 ">
        <thead className="text-xs text-[#964B7D] uppercase text-nowrap">
          <tr>
            <th scope="col" className="px-10 py-3">
              Event
            </th>
            <th scope="col" className="px-10 py-3">
              Date
            </th>
            <th scope="col" className="px-10 py-3">
              Location{" "}
            </th>
          </tr>
        </thead>
        <tbody>
        {data?.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-20">
                No Live Events
              </td>
            </tr>
          ) : (
            data?.map((data: any, index: any) => {
              return (
                <TableRow
                  key={index}
                  event={data.title}
                  img={data.posterUrl}
                  date={data.date}
                  venueAddress={data.venueAddress}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DTable;
