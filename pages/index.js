import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Buses from '../components/Bus';

export default function Home({ cityData }) {
  const [fromCity, setFromCity] = useState();
  const [fromCityName, setFromCityName] = useState();
  const [toCityName, setToCityName] = useState();
  const [toCity, setToCity] = useState();
  const [startDate, setStartDate] = useState();
  const [busData, setBusData] = useState();

  const fromCityChange = (e) => {
    setFromCity(e.target.value);
  };
  const changeToCity = (e) => {
    setToCity(e.target.value);
  };

  let cityList;
  if (cityData) {
    cityList = cityData.data.map((item, index) => (
      <option value={item.CityId} key={index}>
        {item.City}
      </option>
    ));
  }
  let toCityList;
  if (fromCity) {
    toCityList = cityData.data
      .filter((item) => item.CityId != fromCity)
      .map((item, index) => (
        <option value={item.CityId} key={index}>
          {item.City}
        </option>
      ));
  }

  const searchBuses = async (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !startDate) {
      alert('Please pickup route and time first!');
    } else {
      await fetch(
        `http://api.iamgds.com/ota/Search?fromCityId=${fromCity}&toCityId=${toCity}&journeyDate=${startDate}`,
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
          setBusData(result);
          setFromCityName(result.data.FromCityName);
          setToCityName(result.data.ToCityName);
        })
        .catch((error) => alert('error is occured'));
    }
  };

  const busList = busData ? (
    busData.data.Buses.length > 0 ? (
      busData.data.Buses.map((bus, i) => {
        return (
          <div key={i} className="">
            <Buses
              bus={bus}
              fromCity={fromCity}
              toCity={toCity}
              startDate={startDate}
            />
          </div>
        );
      })
    ) : (
      <h5>No Buses Found</h5>
    )
  ) : null;
  return (
    <div className="md:container md:mx-auto m-12">
      <div className="md:grid md:grid-cols-4 align-center ">
        {' '}
        <div className="flex align-center">
          <label htmlFor="FromCity"> From : </label>
          <select
            className="mt-1 ml-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={fromCityChange}
            id="FromCity"
            name="FromCity"
          >
            <option value="">Select from City</option>
            {cityData ? cityList : null}
          </select>
          <p className="display_none required">*Required</p>
        </div>
        <div className="flex align-center">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="toCity"
          >
            {' '}
            To :{' '}
          </label>
          <select
            className="mt-1 ml-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={changeToCity}
            id="toCity"
            name="ToCity"
          >
            <option value="">Select To City</option>
            {fromCity ? toCityList : null}
          </select>
          <p className="display_none required">*Required</p>
        </div>
        <div>
          {' '}
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="startDate"
          >
            Select Date :
          </label>{' '}
          <input
            id="startDate"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p className="display_none required">*Required</p>
        </div>
        <button
          className="inline-flex w-2/5 justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          onClick={searchBuses}
        >
          Search
        </button>
      </div>

      {fromCityName && toCityName ? (
        <div className="block m-3">
          <div className="mt-5 mb-6">
            <h1 className="text-3xl leading-6 font-bold text-gray-900">
              Available Buses
            </h1>
          </div>
          <div className="text-center">
            <h5 className="text-base font-medium text-gray-900">
              {fromCityName} To {toCityName}
            </h5>
            <h5 className="text-base font-medium text-blue-900">{startDate}</h5>
          </div>
          <div>{busList}</div>
        </div>
      ) : null}
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://api.iamgds.com/ota/CityList', {
    headers: {
      'access-token': process.env.accessToken,
      'Content-Type': 'application/json',
    },
    method: 'get',
  });
  const cityData = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      cityData,
    },
  };
}
