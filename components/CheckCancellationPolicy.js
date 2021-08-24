export default function CheckCancellationPolicy({
  selectedSeats,
  checkCanclePolicy,
  setSeatsToCancle,
  canclePolicy,
  cancleSeat,
}) {
  return (
    <>
      <div>
        <label className="flex">
          Enter Your Booked Seat Numbers to cancle e.g.:
          <span className="flex mr-3"> {selectedSeats} </span> (Saperated By
          Comma {`(',')`})
        </label>
        <input
          type="text"
          name="seatstocancle"
          onChange={(e) => {
            setSeatsToCancle(e.target.value);
          }}
          className=" mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-auto shadow-sm sm:text-sm border-2 border-black rounded-md"
        />
        <button onClick={checkCanclePolicy}>Check Policy</button>
      </div>
      <div>
        {canclePolicy && canclePolicy.IsCancellable ? (
          <>
            <div>
              {' '}
              <p>These Seat(s) are Cancellable</p>{' '}
              <p>Cancle Charge Percentage : {canclePolicy.ChargePct}%</p>
              <p>Total Fare : ₹ {canclePolicy.TotalFare} </p>
              <p>Refund Amount : ₹ {canclePolicy.RefundAmount} </p>
            </div>
            <div>
              <p>Do you want to cancle it?</p>
              <button onClick={cancleSeat}>Yes</button>
            </div>
          </>
        ) : canclePolicy && !canclePolicy.IsCancellable ? (
          <div>
            <p>Not Cancellable</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
