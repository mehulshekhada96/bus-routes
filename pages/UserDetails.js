import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserDetails() {
  const [ContactInfo, setContactInfo] = useState({});
  console.log(ContactInfo);
  const [CustomerName, setCustomerName] = useState('');

  const handleSave = () => {
    console.log(ContactInfo);
  };
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
      </div>

      <Link href="/">
        <a>Go back</a>
      </Link>
    </>
  );
}
