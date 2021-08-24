export default function TicketDetails({ ticket }) {
  return (
    <>
      <div className="mx-20 border-2 border-gray-300">
        <div className="w-full bg-gray-300 p-2">
          <h1 className="font-bold text-lg">Trip Details</h1>
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <p className="font-bold my-2">
              PNR No. : <span className="font-semibold"> {ticket.PNRNo}</span>
            </p>
            <p className="font-bold my-2">
              Journey From :{' '}
              <span className="font-semibold">{ticket.FromCityName}</span>{' '}
            </p>
            <p className="font-bold my-2">
              Class: <span className="font-semibold">{ticket.BusTypeName}</span>{' '}
            </p>
            <p className="font-bold my-2">
              Pickup Point:{' '}
              <span className="font-semibold">
                {ticket.PickupInfo.PickupName} {ticket.PickupInfo.PickupTime}
              </span>{' '}
            </p>
            <div className="text-left p-2">
              <p className="font-bold my-2 ">
                No. of Seats :{' '}
                <span className="font-semibold">{ticket.TotalSeats}</span>{' '}
              </p>
              {ticket.Passengers.map((p, i) => (
                <p key={i} className="font-bold my-2 ">
                  Seat No.:
                  <span className="font-semibold ml-2">
                    {p.SeatNo} (
                    {p.SeatType == 'seater' ? (
                      <span>Seating</span>
                    ) : p.SeatType == 'sleeper' ? (
                      <span>Sleeping</span>
                    ) : null}
                    )
                  </span>{' '}
                </p>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <p className="font-bold my-2">
              Journey Date :{' '}
              <span className="font-semibold"> {ticket.JourneyDate}</span>
            </p>
            <p className="font-bold my-2">
              Journey To :{' '}
              <span className="font-semibold">{ticket.ToCityName}</span>{' '}
            </p>
            <p className="font-bold my-2">
              Total Passengers :{' '}
              <span className="font-semibold">{ticket.Passengers.length}</span>{' '}
            </p>
            <p className="font-bold my-2">
              Dropping Point:{' '}
              <span className="font-semibold">
                {/* {ticket.DropoffInfo.DropoffName} {ticket.DropoffInfo.DropoffTime} */}
              </span>{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-20 my-5 border-2 border-gray-300">
        <div className="w-full bg-gray-300 p-2">
          <h1 className="font-bold text-lg">Passenger Details</h1>
        </div>
        <div className="grid grid-cols-12 font-bold text-left p-2">
          <div className="col-span-8 ">
            <p>Name</p>
          </div>
          <div className="col-span-1 text-center">
            <p>Age</p>
          </div>
          <div className="col-span-1 text-center">
            <p>Gender</p>
          </div>
          <div className="col-span-1 text-center">
            <p>Seat</p>
          </div>
          <div className="col-span-1 text-center">
            <p>Rate</p>
          </div>
        </div>
        {ticket.Passengers.map((p, i) => (
          <div key={i} className="grid grid-cols-12  text-left p-2">
            <div className="col-span-8 ">
              <p>{p.Name}</p>
            </div>
            <div className="col-span-1 text-center ">
              <p>{p.Age}</p>
            </div>
            <div className="col-span-1 text-center">
              <p>{p.Gender}</p>
            </div>
            <div className="col-span-1 text-center">
              <p>{p.SeatNo}</p>
            </div>
            <div className="col-span-1 text-center">
              <p> ₹ {p.Fare}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-20 my-5 border-2 border-gray-300">
        <div className="w-full bg-gray-300 p-2">
          <h1 className="font-bold text-lg">Total Fare Details</h1>
        </div>
        <div className="w-full p-2 flex justify-between">
          <h1 className="font-bold text-md">Total Fare :</h1>
          <h1 className="font-bold text-lg">₹ {ticket.TotalFare}</h1>
        </div>
      </div>
    </>
  );
}
