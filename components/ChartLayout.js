import _ from 'lodash';
import { useState, useEffect } from 'react';

export default function ChartLayout({
  data,
  totalSelected,
  setTotalSelected,
  totalPrice,
  setTotalPrice,
}) {
  const [berthType, setBerthType] = useState('Lower');

  const seatHandler = async (e) => {
    e.preventDefault();

    const seqNo = e.target.innerText;
    const price = e.target.getAttribute('price');
    !totalSelected.includes(seqNo)
      ? totalSelected.length >= 6
        ? alert("Can't select More then 6 Seats")
        : (setTotalSelected(totalSelected.push(seqNo)),
          setTotalPrice(totalPrice + Number(price)))
      : totalSelected.includes(seqNo)
      ? _.remove(totalSelected, (n) => n === seqNo) &&
        setTotalPrice(totalPrice - Number(price))
      : null;
    setTotalSelected(totalSelected);
    await getHoldId();
  };

  const getHoldId = () => {
    fetch('http://api.iamgds.com/ota/HoldSeats', {
      method: 'post',
      headers: {
        'access-token': process.env.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FromCityId: 4292,
        ToCityId: 4562,
        JourneyDate: '2021-08-21',
        BusId: 51,
        PickUpID: '44953',
        DropOffID: '750',
        ContactInfo: {
          CustomerName: 'test',
          Email: 'testbooking@travelyaari.com',
          Phone: '9090909090',
          Mobile: '9090909090',
        },
        Passengers: [
          {
            Name: 'test',
            Age: 25,
            Gender: 'M',
            SeatNo: '8',
            Fare: 13,
            SeatTypeId: 1,
            IsAcSeat: false,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const lowerSeats = data.ChartLayout.Layout.Lower.map((seat, index) => (
    <Chart
      key={index}
      seat={seat}
      index={index}
      data={data}
      berthType={berthType}
      seatHandler={seatHandler}
      totalSelected={totalSelected}
    />
  ));
  const upperSeats = data.ChartLayout.Layout.Upper
    ? data.ChartLayout.Layout.Upper.map((seat, index) => (
        <Chart
          key={index}
          index={index}
          seat={seat}
          data={data}
          berthType={berthType}
          seatHandler={seatHandler}
          totalSelected={totalSelected}
        />
      ))
    : null;
  useEffect(() => {
    let lower = document.getElementById('lower');
    let upper = document.getElementById('upper');
    if (lower && upper && berthType === 'Lower') {
      lower.classList.add('active');
      upper.classList.remove('active');
    }
    if (lower && upper && berthType === 'Upper') {
      upper.classList.add('active');
      lower.classList.remove('active');
    }
  }, [berthType]);

  return (
    <>
      <div className="container w-60">
        {data.ChartLayout.Layout.Upper ? (
          <div className=" flex justify-around upper-lower">
            {' '}
            <button
              id="lower"
              className="inline-flex w-1/2 justify-center py-2 px-2 border  rounded-2xl border-transparent shadow-sm text-sm font-medium rounded-md hover:text-white  hover:bg-indigo-700 focus:outline-none "
              onClick={() => setBerthType('Lower')}
            >
              Lower
            </button>
            <button
              id="upper"
              className="inline-flex w-1/2 justify-center py-2 px-2 border rounded-2xl border-transparent shadow-sm text-sm font-medium rounded-md  hover:bg-indigo-700 focus:outline-none "
              onClick={() => setBerthType('Upper')}
            >
              Upper
            </button>
          </div>
        ) : (
          <div className=" flex active justify-around upper-lower inline-flex w-full justify-center py-2 px-2 border  rounded-2xl border-transparent shadow-sm text-sm font-medium rounded-md hover:text-white  hover:bg-indigo-700 focus:outline-none ">
            Lower
          </div>
        )}

        <div
          className={`w-auto grid grid-cols-${data.ChartLayout.Info.Lower.MaxCols} grid-rows-${data.ChartLayout.Info.Lower.MaxRows} gap-2`}
        >
          {berthType === 'Lower' ? lowerSeats : upperSeats}
        </div>
      </div>
    </>
  );
}

export function Chart({ seat, data, berthType, seatHandler, totalSelected }) {
  const showDetails = (e) => {
    const tooltip = e.target.nextElementSibling;
    tooltip.classList.remove('display_none');
  };
  const hideDetails = (e) => {
    const tooltip = e.target.nextElementSibling;
    tooltip.classList.add('display_none');
  };
  const zIndex = berthType === 'Lower' ? 'z-10' : 'z-50';
  const greenClass =
    totalSelected && totalSelected.length > 0
      ? totalSelected.includes(data.ChartSeats.Seats[seat[0]])
        ? 'selected'
        : null
      : null;
  return (
    <div
      className={` w-${8 * seat[3]} h-${8 * seat[4]} relative  col-start-${
        seat[2] + 1
      }  row-start-${seat[1] + 1}  row-span-${seat[4]} col-span-${
        seat[3]
      } seat `}
    >
      <div
        onMouseEnter={showDetails}
        onMouseLeave={hideDetails}
        onClick={data.SeatsStatus.Status[seat[0]] === 1 ? seatHandler : null}
        className={`cursor-pointer w-${8 * seat[3]} h-${8 * seat[4]} avail${
          data.SeatsStatus.Status[seat[0]]
        } border-2  text-center ${zIndex} ${greenClass} `}
        seqno={seat[0]}
        price={data.SeatsStatus.Fares[seat[0]][0]}
      >
        {data.ChartSeats.Seats[seat[0]]}
      </div>
      <div
        id="tooltip"
        className="absolute bg-black w-max tooltip display_none text-white text-xs rounded py-1 px-4 right-0 bottom-full"
      >
        <div>
          {' '}
          <span className="font-bold ">Seat No.:</span>{' '}
          {data.ChartSeats.Seats[seat[0]]}
        </div>
        <div>
          {' '}
          <span className="font-bold ">Seat Type:</span>{' '}
          {seat[5] === 1 ? (
            <>Seater</>
          ) : seat[5] === 2 ? (
            <>Sleeper</>
          ) : seat[5] === 4 ? (
            <>Semi Sleeper</>
          ) : null}
        </div>
        <div>
          {' '}
          <span className="font-bold ">Seat Rate:</span>{' '}
          {data.SeatsStatus.Fares[seat[0]][0]}
        </div>
        <div>
          {' '}
          <span className="font-bold ">Seat Level:</span> {berthType}
        </div>
        <svg
          className="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
}
