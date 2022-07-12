import { BsFilter } from 'react-icons/bs';

export const Bar = ({ selected, setSelected }) => {
  const startDate = new Date('6/30/2022');
  const endDate = new Date('8/21/2022');
  const days = 53;
  const day = 1000 * 60 * 60 * 24;
  const today = new Date();

  const daysPassed = Math.floor((today - startDate) / day);
  const daysLeft = Math.floor((endDate - today) / day);

  const options = [
    { value: 'lp', text: 'LP GESAMT' },
    { value: 'progress', text: 'LP GAINED' },
  ];

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
      <div
        className='flex m-3 items-center justify-center gap-3
    bg-[#1f1f23] flex-col drop-shadow-lg p-4 pl-5 rounded-lg text-white '
      >
        <div>
          {daysPassed} Tage vergangen
          <span className='ml-3 mr-3'>·</span>
          {daysLeft} Tage übrig
        </div>
        <progress
          className='progress w-64 progress-primary'
          value={(100 / days) * daysPassed}
          max='100'
        ></progress>
      </div>
      <div
        className='flex m-3 items-center justify-center gap-3
    bg-[#1f1f23] drop-shadow-lg p-4 pl-5 rounded-lg text-white'
      >
        <BsFilter size={25} className='mr-1' />
        <span>Filter</span>
        <select
          className='select w-40 ml-3 max-w-xs bg-[#3a3a3d] '
          value={selected}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
