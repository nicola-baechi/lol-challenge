import { TbCrown } from 'react-icons/tb';

const rankColors = [
  'text-[#ff9800] bg-[#3b2c2e]',
  'text-[#3279f9] bg-[#1c2854]',
  'text-[#1ba668] bg-[#135437]',
  'text-[#ffffff] bg-[#2f2f36]',
  'text-[#ffffff] bg-[#2f2f36]',
];

export const Header = ({ username, name, index }) => {
  return (
    <>
      <div className='tooltip' data-tip={`${name} gewinnt gerade`}>
        {index == 0 && <TbCrown size={25} color='#f4c675' />}
      </div>
      <div className='flex gap-2 items-center mb-2'>
        <div className={`${rankColors[index]} font-bold p-1 pr-3 pl-3 rounded`}>
          {index + 1}
        </div>
        <div className='font-bold text-2xl hover:underline'>
          <a
            href={`https://euw.op.gg/summoners/euw/${username}`}
            target='_blank'
            rel='noreferrer'
          >
            {username}
          </a>
        </div>
      </div>
    </>
  );
};
