export default function NewTicketData({ data }) {
  return (
    <div className="text-center">
      <p className="font-bold text-lg text-green-600 my-2">
        Ticket Updated Successfully
      </p>

      <p className="font-bold text-md  text-grey-800 my-2">
        New PNR No. : <span className=" font-bold ml-2"> {data.NewPNRNo} </span>
      </p>
      <p className="font-bold text-md  text-grey-800 my-2">
        New Ticket No. :{' '}
        <span className=" font-bold ml-2"> {data.NewTicketNo} </span>
      </p>
      <p className="font-bold text-md  text-grey-800 my-2">
        Refund Amount :{' '}
        <span className=" font-bold ml-2">₹ {data.RefundAmount} </span>
      </p>

      <p className="font-bold text-xl  text-grey-800 my-2">
        New Total Fare :{' '}
        <span className=" font-bold ml-2">₹ {data.NewTotalFare} </span>
      </p>
    </div>
  );
}
