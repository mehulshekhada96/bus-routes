import { useState, useEffect } from 'react';
import PickupAndDrop from './PickUpAndDrops';
import ChartLayout from './ChartLayout';
import SuggestionList from './SuggestionList';
import TotalFare from './TotalFare';
import JourneyInfo from './JourneyInfo';
export default function SeatSelection({
  seatData,
  bus,
  totalPrice,
  totalSelected,
  setTotalPrice,
  setTotalSelected,
}) {
  return (
    <>
      <div className="container grid-cols-3 grid gap-8 ">
        <ChartLayout
          data={seatData}
          totalSelected={totalSelected}
          setTotalSelected={setTotalSelected}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
        <div>
          <PickupAndDrop bus={bus} />
          {totalSelected.length > 0 ? (
            <TotalFare totalSelected={totalSelected} price={totalPrice} />
          ) : (
            <p className="required">*Select Seat First</p>
          )}
        </div>
        <JourneyInfo bus={bus} />
      </div>
      <SuggestionList />
    </>
  );
}
