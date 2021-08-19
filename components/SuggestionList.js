export default function SuggestionList() {
  return (
    <ul className="mt-5 flex">
      <li className="flex my-5 mr-2 align-center">
        {' '}
        <div className="w-5 mx-2 border  h-5 avail1"></div>Available
      </li>
      <li className="flex my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2 border  h-5 selected"></div>Selected
      </li>
      <li className="flex  my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2 border  h-5 avail0"></div>Not Available
      </li>
      <li className="flex  my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2 border h-5 avail2"></div>Available only for
        Male
      </li>
      <li className="flex  my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2 border  h-5 avail3"></div>Available only for
        Female
      </li>
      <li className="flex my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2 border h-5 avail-2"></div>Booked By Male
      </li>
      <li className="flex my-5 mx-2 align-center">
        {' '}
        <div className="w-5 mx-2  border h-5 avail-3"></div>Booked By Female
      </li>
    </ul>
  );
}
