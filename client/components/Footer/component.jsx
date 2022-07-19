import { BiHeart } from 'react-icons/bi';

export const Footer = () => {
  return (
    <footer
      className='footer items-center p-4 bg-neutral h-16 text-neutral-content
      bottom-0 left-0 right-0'
    >
      <div className='items-center grid-flow-col flex text-lg'>
        made with <BiHeart color='red' /> by pluvio
      </div>
    </footer>
  );
};
