import Link from 'next/link';
export default function TotalFare({
  totalSelected,
  price,
  SetShowUserDatails,
  showUserDetails,
  seatData,
}) {
  let seats = totalSelected.sort((a, b) => Number(a) - Number(b));
  let totalfare = price;
  const selectedSeats = seats.map((seqNo, i) => {
    return (
      <p key={i} className="ml-2">
        {seatData.ChartSeats.Seats[seqNo]}
        {seats.length - 1 !== i ? <>,</> : null}
      </p>
    );
  });
  return (
    <div className="mt-5">
      <div className="flex my-2 px-2 justify-between">
        <p>Seats Selected</p>
        <div className="flex">{selectedSeats}</div>
      </div>
      <div className="flex my-5 bg-yellow-100 bg-opacity-40 py-2 px-2 justify-between font-bold">
        <p>Total Fare</p>
        <p className="text-lg"> ₹ {totalfare}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            SetShowUserDatails(totalSelected.length > 0 ? true : false)
          }
          className="inline-flex w-1/4 justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active"
        >
          {showUserDetails ? 'Update' : 'Continue ->'}
        </button>
      </div>
    </div>
  );
}
