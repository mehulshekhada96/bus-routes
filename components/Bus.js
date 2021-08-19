import { useState } from 'react';
import SeatSelection from './SeatSelection';
export default function Buses({ bus, startDate, fromCity, toCity }) {
  const [showSeats, setShowSeats] = useState(false);
  const [seatData, setSeatdata] = useState();
  const [totalSelected, setTotalSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    setShowSeats(!showSeats);
    fetch(
      `http://api.iamgds.com/ota/Chart?fromCityId=${fromCity}&toCityId=${toCity}&journeyDate=${startDate}&busId=${bus.RouteBusId}`,
      {
        headers: {
          'access-token': process.env.accessToken,
          'Content-Type': 'application/json',
        },
        method: 'get',
      }
    )
      .then((res) => res.json())
      .then((result) => setSeatdata(result.data))
      .catch((error) => console.log('error occured', error));
  };
  return (
    <>
      {' '}
      {/* {bus.RouteBusId} */}
      <div className="py-10 grid grid-flow-row grid-cols-6 grid-rows-1 gap-4 ">
        <div className="col-span-2">
          <h3 className="text-2xl mb-2 leading-6 font-bold text-gray-900 ">
            {bus.CompanyName}
          </h3>
          <p className="text-xs mt-5 text-gray-900">{bus.DisplayBusType}</p>
        </div>
        <div className="px-12 grid grid-flow-row grid-cols-3 grid-rows-1 gap-2 align-center col-span-2 ">
          <div className="text-center">
            <p>{bus.DeptTime}</p>
            <p>{bus.FromName}</p>
          </div>
          <div className="text-center">{`--->`}</div>
          <div className="text-center">
            <p>{bus.ArrTime}</p>
            <p>{bus.ToName}</p>
          </div>
        </div>
        <div>
          <p>Starting From</p>
          <h5>₹ {bus.BusStatus.BaseFares[0]} </h5>
        </div>
        <div>
          <button
            className="inline-flex w-2/5 justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700 focus:outline-none  "
            onClick={handleClick}
          >
            Select Seat
          </button>
          <p>{bus.BusStatus.Availability} Seats Available</p>
        </div>
      </div>
      {showSeats && seatData ? (
        <div className="transition duration-500">
          <SeatSelection
            bus={bus}
            fromCity={fromCity}
            toCity={toCity}
            startDate={startDate}
            seatData={seatData}
            totalPrice={totalPrice}
            totalSelected={totalSelected}
            setTotalPrice={setTotalPrice}
            setTotalSelected={setTotalSelected}
          />
        </div>
      ) : null}
    </>
  );
}
