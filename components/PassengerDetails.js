import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function PassengerDetails({
  seatNo,
  setPassengers,
  seq,
  Passengers,
  seatData,
  bus,
}) {
  const [name, setName] = useState();
  const [Phone, setPhone] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const seatType = _.filter(seatData.ChartLayout.Layout.Lower, function (o) {
    return o[0] == seq;
  });

  // _.filter(seatData.ChartLayout.Layout.Upper, function (o) {
  //   return o[0] == seq;
  // })[5];
  const [obj, setObj] = useState({
    SeatNo: seatNo,
    Fare: seatData.SeatsStatus.Fares[seq][0],
    SeatTypeId: seatType[0][5],
    IsAcSeat: bus.BusType.IsAC === 'AC',
  });
  useEffect(() => {
    console.log(obj);
    !_.some(Passengers, ['SeatNo', seatNo])
      ? setPassengers((Passengers) => [...Passengers, obj])
      : null;
    console.log(seatType[0][5]);
  });
  const handleConfirm = () => {
    console.log(obj);
    !_.some(Passengers, ['SeatNo', seatNo])
      ? setPassengers((Passengers) => [...Passengers, obj])
      : null;
    console.log(seatType[0][5]);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1 text-center font-bold p-2 mt-1">
          {seatNo}
        </div>
        <div className="col-span-5">
          <input
            type="text"
            name="Name"
            id={`Name${seatNo}`}
            placeholder="Name"
            onChange={(e) => {
              setObj((obj) => Object.assign(obj, { Name: e.target.value }));
            }}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
          />
        </div>
        <div className="col-span-4">
          <input
            type="tel"
            name="Phone"
            id={`PassengerPhone${seatNo}`}
            autoComplete="Phone"
            placeholder="Passenger Phone"
            onChange={(e) => {
              setObj((obj) => Object.assign(obj, { Phone: e.target.value }));
            }}
            className="mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="Age"
            id={`Age${seatNo}`}
            placeholder="Age"
            onChange={(e) => {
              setObj((obj) =>
                Object.assign(obj, { Age: Number(e.target.value) })
              );
            }}
            className="mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
          />{' '}
        </div>
        <div className="col-span-1">
          <div>
            <input
              type="radio"
              name={`gender${seatNo}`}
              value="M"
              onChange={(e) => {
                setObj((obj) => Object.assign(obj, { Gender: e.target.value }));
              }}
            />
            Male
            <input
              type="radio"
              name={`gender${seatNo}`}
              value="F"
              onChange={(e) => {
                setObj((obj) => Object.assign(obj, { Gender: e.target.value }));
              }}
            />
            Female
          </div>
        </div>
      </div>
      {/* <button onClick={handleConfirm}>Confirm</button> */}
    </>
  );
}
