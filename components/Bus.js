import { useEffect, useState } from 'react';
import HoldSuccess from './HoldSuccess';
import SeatSelection from './SeatSelection';
import UserDetails from './UserDetails';
import Loader from './Loader';
import CheckCancellationPolicy from './CheckCancellationPolicy';
import NewTicketData from './NewTicketData';
export default function Buses({ bus, startDate, fromCity, toCity }) {
  const [showSeats, setShowSeats] = useState(false);
  const [seatData, setSeatdata] = useState();

  const [totalSelected, setTotalSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showUserDetails, SetShowUserDatails] = useState(false);
  const [PickupId, setPickupId] = useState();
  const [DropOffID, setDropOffID] = useState();
  const [holdData, setHoldData] = useState();
  const [ticketData, setTicketData] = useState();
  const [ticketStatus, setTicketStatus] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [seatsToCancle, setSeatsToCancle] = useState();
  const [CheckPolicy, setCheckPolicy] = useState(false);
  const [canclePolicy, setCanclePolicy] = useState();
  const [newTicket, setNewTicket] = useState();
  const seats = totalSelected
    .sort((a, b) => Number(a) - Number(b))
    .map((i) => seatData.ChartSeats.Seats[i]);
  console.log('seats', seats);
  const selectedSeats = seats.map((seqNo, i) => {
    return (
      <p key={i} className="ml-2">
        {seqNo}
        {seats.length - 1 !== i ? <>,</> : null}
      </p>
    );
  });
  console.log('selectedSeats', selectedSeats);
  // useEffect(() => {
  //   setSeatdata();
  //   setShowSeats(false);
  //   setTotalSelected([]);
  //   setTotalPrice(0);
  //   SetShowUserDatails(false);
  //   setPickupId();
  //   setDropOffID();
  //   console.log('seatData');
  // }, [bus]);

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
  const checkStatus = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // console.log(holdData);
    await fetch('http://api.iamgds.com/ota/bookingstatusv2', {
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
        setisLoading(false);
        if (result.success === false) {
          alert(result.Error.Msg);
        }
        if (result.success) {
          console.log(result.data);
          setTicketStatus(result.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const checkCanclePolicy = async (e) => {
    e.preventDefault();
    await fetch(
      `http://api.iamgds.com/ota/IsCancellable?PNRNo=${ticketStatus.PNRNo}&TicketNo=${ticketStatus.TicketNo}&seatNos=${seatsToCancle}`,
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
          setCanclePolicy(result.data);
        } else {
          alert(result.Message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong ');
      });
  };
  const cancleSeat = async (e) => {
    e.preventDefault();
    await fetch(`http://api.iamgds.com/ota/CancelSeats`, {
      headers: {
        'access-token': process.env.accessToken,
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        PNR: ticketStatus.PNRNo,
        TicketNo: ticketStatus.TicketNo,
        SeatNos: seatsToCancle,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setNewTicket(result.data);
        } else {
          alert(result.Error.Msg);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong ');
      });
  };
  return (
    <>
      {' '}
      {/* {bus.RouteBusId} */}
      {bus && !holdData ? (
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
      ) : null}
      {showSeats && seatData && !holdData ? (
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
            SetShowUserDatails={SetShowUserDatails}
            showUserDetails={showUserDetails}
            PickupId={PickupId}
            DropOffID={DropOffID}
            setPickupId={setPickupId}
            setDropOffID={setDropOffID}
          />
        </div>
      ) : null}
      {showUserDetails && !holdData ? (
        <UserDetails
          bus={bus}
          fromCity={fromCity}
          PickupId={PickupId}
          DropOffID={DropOffID}
          toCity={toCity}
          startDate={startDate}
          seatData={seatData}
          totalPrice={totalPrice}
          totalSelected={totalSelected}
          setTotalPrice={setTotalPrice}
          setTotalSelected={setTotalSelected}
          SetShowUserDatails={SetShowUserDatails}
          showUserDetails={showUserDetails}
          setHoldData={setHoldData}
        />
      ) : null}
      {holdData && !ticketData ? (
        <HoldSuccess
          seatData={seatData}
          totalSelected={totalSelected}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
          holdData={holdData}
          setTicketData={setTicketData}
          setIsLoading={setisLoading}
        />
      ) : null}
      {ticketData && !ticketStatus ? (
        <div className="text-center">
          {' '}
          <p className="font-bold text-xl text-green-600 my-2">
            Congratulations ! Booking Successfull
          </p>
          <p className="font-bold text-xl text-green-600 my-2">
            Thanks for Booking With Us
          </p>
          {/* <p className="text-grey-900 font-bold">
            Ticket No: {ticketData.TicketNo}{' '}
          </p>
          <p className="text-grey-900 font-bold">
            PNR No.: {ticketData.PNRNo}{' '}
          </p> */}
          <button
            className="inline-flex w-auto justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700 focus:outline-none  "
            onClick={checkStatus}
          >
            Check Booking Status
          </button>
        </div>
      ) : null}
      {ticketStatus && ticketStatus.Status === 1 && !newTicket ? (
        <div className="text-center">
          {' '}
          <p className="font-bold text-xl text-green-600 my-2">
            {ticketStatus.Message}
          </p>
          <p className="text-grey-900 font-bold">
            Ticket No: {ticketStatus.TicketNo}{' '}
          </p>
          <p className="text-grey-900 font-bold">
            PNR No.: {ticketStatus.PNRNo}{' '}
          </p>
          <button onClick={() => setCheckPolicy(!CheckPolicy)}>
            Check Cancellable Policy
          </button>
        </div>
      ) : ticketStatus && ticketStatus.Status === 0 ? (
        <div className="text-center">
          {' '}
          <p className="font-bold text-xl text-green-600 my-2">
            Please Wait Booking is in Progress
          </p>{' '}
          <Loader />{' '}
        </div>
      ) : ticketStatus && ticketStatus.Status === -1 ? (
        <div className="text-center">
          {' '}
          <p className="font-bold text-xl text-red-900 my-2">
            Booking is unsuccessfull or canclled
          </p>{' '}
        </div>
      ) : ticketStatus && ticketStatus.Status === -2 ? (
        <div className="text-center">
          {' '}
          <p className="font-bold text-xl text-red-900 my-2">
            Something went wrong ! Please try again..
          </p>{' '}
        </div>
      ) : null}
      {CheckPolicy && !newTicket ? (
        <CheckCancellationPolicy
          checkCanclePolicy={checkCanclePolicy}
          selectedSeats={selectedSeats}
          setSeatsToCancle={setSeatsToCancle}
          canclePolicy={canclePolicy}
          cancleSeat={cancleSeat}
        />
      ) : null}
      {newTicket ? <NewTicketData data={newTicket} /> : null}
      {isLoading ? <Loader /> : null}
    </>
  );
}
