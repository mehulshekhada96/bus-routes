export default function HoldSuccess({
  seatData,
  totalSelected,
  selectedSeats,
  totalPrice,
  holdData,
  setTicketData,
  setIsLoading,
}) {
  const getTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(holdData);
    await fetch('http://api.iamgds.com/ota/BookSeats', {
      method: 'post',
      headers: {
        'access-token': process.env.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(holdData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        if (result.success === false) {
          alert(result.Error.Msg);
        }
        if (result.success) {
          console.log(result.data);
          setTicketData(result.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="text-center">
      <p className="required font-bold text-lg my-3">
        *Don{`'`}t Refresh The Page
      </p>
      <p className="font-medium text-lg text-grey-900 my-2">Journey</p>
      <p className="font-bold text-xl text-green-600 my-2">
        Your seat(s) are reserved, make payment within 10 minutes
      </p>
      <p className="font-medium text-md text-grey-800 my-2 mt-10">
        Total Passenger :{' '}
        <span className=" font-bold ml-2">{totalSelected.length}</span>
      </p>
      <p className="font-medium text-md text-grey-800 my-2">
        Sub Total : <span className=" font-bold ml-2">₹ {totalPrice} </span>
      </p>
      <div className="font-medium text-md text-grey-800 my-2 flex text-center justify-center">
        Seats : <span className=" font-bold ml-2 flex">{selectedSeats}</span>
      </div>
      <p className="font-bold text-xl  text-grey-800 my-10">
        Total : <span className=" font-bold ml-2">₹ {totalPrice} </span>
      </p>
      <button
        onClick={getTicket}
        className="inline-flex w-auto justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700 focus:outline-none  "
      >
        Pay and Confirm
      </button>
    </div>
  );
}
