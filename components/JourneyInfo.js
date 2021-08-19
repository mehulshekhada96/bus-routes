export default function JourneyInfo({ bus }) {
  return (
    <>
      <div className="w-3/4 block container mx-auto border h-max">
        <div className="active border px-3 py-2 text-lg font-bold">
          {' '}
          Journey Information
        </div>
        <div className=" border px-3 py-2 text-md font-medium"> Journey</div>
        <div className=" border px-3 py-2 text-md ">
          {' '}
          {bus.FromName} to {bus.ToName}
        </div>
        <div className="flex ">
          <div className="w-2/5 border px-3 py-2 text-md font-semibold ">
            Journey Date :
          </div>
          <div className="w-3/5 border px-3 py-2 text-md ">{bus.DeptTime}</div>
        </div>
        <div className="flex ">
          <div className="w-2/5 border px-3 py-2 text-md font-semibold ">
            Arrival Time :
          </div>
          <div className="w-3/5 border px-3 py-2 text-md ">{bus.ArrTime}</div>
        </div>
      </div>
    </>
  );
}
