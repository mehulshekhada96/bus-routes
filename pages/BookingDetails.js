import { useState } from 'react';
import TicketDetails from '../components/TicketDetails';

export default function BookingDetails() {
  const [pnr, setPnr] = useState();
  const [ticketNo, setTicketNo] = useState();
  const [ticket, setTicket] = useState();
  const findTicket = async () => {
    console.log(ticketNo, pnr);
    await fetch(
      `http://tranapi.iamgds.com/ota/BookingDetails?PNR=${pnr}&TicketNo=${ticketNo}`,
      {
        headers: {
          'access-token': process.env.accessToken,
          'Content-Type': 'application/json',
        },
        method: 'get',
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setTicket(result.data);
        } else {
          alert('Wrong Credentials');
        }
      })
      .catch((err) => {
        console.log(err);
        // alert('Something went wrong ');
      });
  };
  return (
    <>
      <div className="container px-auto m-20 text-center">
        <p className="text-center font-bold text-2xl">Booking Details</p>
        <div className="grid grid-cols-3 gap-5 mx-64 my-12">
          <div className=" col-span-1 text-left">
            <label>PNR No.</label>
            <input
              name="PNRNo"
              id="pnr"
              onChange={(e) => {
                setPnr(e.target.value);
              }}
              className="mt-1 p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-2 border-black rounded-md"
              placeholder="PNR No."
            />
          </div>
          <div className="col-span-1 text-left">
            <label>Ticket No.</label>
            <input
              name="TicketNo"
              id="TicketNo"
              onChange={(e) => setTicketNo(e.target.value)}
              className="mt-1 w-full col-span-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-2 border-black rounded-md"
              placeholder="Ticket No."
            />
          </div>
          <div className="col-span-1 flex items-end pb-1">
            <button
              onClick={findTicket}
              className="inline-flex w-auto justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700 focus:outline-none "
            >
              Find Ticket
            </button>
          </div>
        </div>
        {ticket ? <TicketDetails ticket={ticket} /> : null}
      </div>
    </>
  );
}
