import { Link } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
const CE_Page2 = () => {
  return (
    <form>
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-black"></span>
      </div>
      <h1 className="font-semibold text-2xl pb-4">Create Event</h1>
      <h3 className="font-semibold text-lg">Tickets</h3>
      <button className="add-ticket-btn font-light text-sm">
        <Link to={"/ind-tickets"} className="add-ticket-btn">Add a Ticket</Link>
      </button>
      <p className="font-light text-sm pt-2">You can add tickets later from Tickets Menu</p>

      <div className="tickets-display flex flex-col items-center justify-center my-5">
            <IoTicketOutline className="text-9xl opacity-20"/>
            <p className="font-light pt-2">You don't seem to have any bookings</p>
            {/* <div className="all-tickets"></div> */}
      </div>

      

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        <button type="submit" className="event-form-btn">
          SAVE CHANGES
        </button>
        <Link
          to={"/create-events/2"}
          className="event-form-btn bg-black text-white"
        >
          CREATE THIS EVENT
        </Link>
      </div>
    </form>
  )
}

export default CE_Page2;