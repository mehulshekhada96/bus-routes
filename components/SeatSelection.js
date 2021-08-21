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
  SetShowUserDatails,
  showUserDetails,
  setSelectedSeqNo,
  selectedSeqNo,
  setPickupId,
  PickupId,
  DropOffID,
  setDropOffID,
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
          selectedSeqNo={selectedSeqNo}
          setSelectedSeqNo={setSelectedSeqNo}
        />
        <div>
          <PickupAndDrop
            bus={bus}
            setPickupId={setPickupId}
            setDropOffID={setDropOffID}
          />
          {!PickupId || !DropOffID ? (
            <p className="required">*Pickup or DropOff is Missing </p>
          ) : totalSelected.length > 0 ? (
            <TotalFare
              totalSelected={totalSelected}
              price={totalPrice}
              SetShowUserDatails={SetShowUserDatails}
              showUserDetails={showUserDetails}
              seatData={seatData}
            />
          ) : (
            <p className="required">*Select Seat First</p>
          )}
          {totalSelected.length <= 0 ? SetShowUserDatails(false) : null}
        </div>
        <JourneyInfo bus={bus} />
      </div>
      <SuggestionList />
    </>
  );
}
