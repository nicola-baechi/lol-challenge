export const Progress = () => {
  const startDate = new Date('6/30/2022');
  const endDate = new Date('8/21/2022');
  const days = 53;
  const day = 1000 * 60 * 60 * 24;
  const today = new Date();

  const daysPassed = Math.floor((today - startDate) / day);
  const daysLeft = Math.floor((endDate - today) / day);

  return (
    <div
      className='flex m-3  gap-3 col-span-2 lg:col-span-1
    bg-[#1f1f23] flex-col drop-shadow-lg p-4 pl-5 rounded-lg text-white '
    >
      <div className='w-full flex lg:flex-col font-medium justify-between'>
        <h6>
          <span className='text-[#38d39c]'>{daysPassed}</span> Tage vergangen
        </h6>
        <h6>
          <span className='text-zinc-400'>{daysLeft}</span> Tage übrig
        </h6>
      </div>
      <progress
        className='progress  progress-success'
        value={(100 / days) * daysPassed}
        max='100'
      ></progress>
    </div>
  );
};
