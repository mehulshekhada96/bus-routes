export default function PickupAndDrop({
  bus,

  setPickupId,

  setDropOffID,
}) {
  const pickups = bus.Pickups.map((pick, i) => {
    return (
      <option key={i} value={pick.PickupCode}>
        {pick.PickupName}, {pick.PickupTime.split(' ')[1]}
      </option>
    );
  });
  const dropoffs = bus.Dropoffs.map((drop, i) => {
    return (
      <option key={i} value={drop.DropoffCode}>
        {drop.DropoffName}, {drop.DropoffTime.split(' ')[1]}
      </option>
    );
  });
  return (
    <>
      <div className="container">
        <div>
          <label htmlFor="pickup">Pickup From:</label>
          <select
            name="pickup"
            onChange={(e) => setPickupId(e.target.value)}
            className="mt-1 ml-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="pickup"
          >
            <option value="">Select Pickup Point</option>
            {pickups}
          </select>
        </div>
        <div>
          <label htmlFor="drop">Drop At:</label>
          <select
            name="drop"
            onChange={(e) => setDropOffID(e.target.value)}
            className="mt-1 ml-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="drop"
          >
            <option value="">Select Drop Point</option>
            {dropoffs}
          </select>
        </div>
      </div>
    </>
  );
}
