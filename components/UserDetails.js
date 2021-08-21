import Link from 'next/link';
import { useEffect, useState } from 'react';
import PassengerDetails from './PassengerDetails';

export default function UserDetails({
  bus,
  fromCity,
  PickupId,
  DropOffID,
  toCity,
  startDate,
  seatData,
  totalPrice,
  totalSelected,
}) {
  const [ContactInfo, setContactInfo] = useState({});

  console.log(ContactInfo);
  console.log('Pickup:', PickupId, 'DropOff:', DropOffID);
  // const [CustomerName, setCustomerName] = useState('');
  const [Passengers, setPassengers] = useState([]);
  // {
  //   IsAcSeat: bus.BusType.IsAC === 'AC',
  // }
  const handleSave = () => {
    console.log(ContactInfo);
    console.log('Pickup:', PickupId, 'DropOff:', DropOffID);
  };
  const getHoldId = () => {
    fetch('http://api.iamgds.com/ota/HoldSeats', {
      method: 'post',
      headers: {
        'access-token': process.env.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FromCityId: Number(fromCity),
        ToCityId: Number(toCity),
        JourneyDate: startDate,
        BusId: bus.RouteBusId,
        PickUpID: PickupId,
        DropOffID,
        ContactInfo,
        Passengers,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success === false) {
          alert(result.Error.Msg);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleConfirm = () => {
    console.log(Passengers);
    getHoldId();
  };
  const PassengerList = totalSelected.map((seq, i) => (
    <div key={i}>
      {' '}
      <PassengerDetails
        seatNo={seatData.ChartSeats.Seats[seq]}
        setPassengers={setPassengers}
        seq={seq}
        Passengers={Passengers}
        seatData={seatData}
        bus={bus}
      />
    </div>
  ));
  return (
    <>
      <div className="container md:container md:mx-auto m-12 mt-64 sm:mt-0">
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg align-center mt-16 font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-5">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <input
                      type="text"
                      name="CustomerName"
                      id="passengername"
                      placeholder="Passenger Name"
                      onChange={(e) =>
                        setContactInfo((obj) =>
                          Object.assign(obj, { CustomerName: e.target.value })
                        )
                      }
                      className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <input
                      type="tel"
                      name="Phone"
                      id="Phone"
                      autoComplete="Phone"
                      placeholder="Passenger Phone"
                      onChange={(e) =>
                        setContactInfo((obj) =>
                          Object.assign(obj, { Phone: e.target.value })
                        )
                      }
                      className="mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <input
                      type="tel"
                      name="Mobile"
                      id="Mobile"
                      autoComplete="Mobile"
                      placeholder="Passenger Mobile"
                      onChange={(e) =>
                        setContactInfo((obj) =>
                          Object.assign(obj, { Mobile: e.target.value })
                        )
                      }
                      className="mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <input
                      type="email"
                      name="Email"
                      id="email-address"
                      placeholder="Passenger Email"
                      onChange={(e) =>
                        setContactInfo((obj) =>
                          Object.assign(obj, { Email: e.target.value })
                        )
                      }
                      className="mt-1  p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-black rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={handleSave}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-5">
          <p>
            Enter Passenger Details <span className="font-bold">(Journey)</span>
          </p>
          <div className="grid grid-cols-12 gap-3 font-bold">
            <div className="col-span-1">Seat No.</div>
            <div className="col-span-5"> Passenger Name:</div>
            <div className="col-span-4">Phone: </div>
            <div className="col-span-1">Age: </div>
            <div className="col-span-1">Gender: </div>
          </div>

          {PassengerList}
        </div>
        <button
          className="inline-flex w-12 justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
