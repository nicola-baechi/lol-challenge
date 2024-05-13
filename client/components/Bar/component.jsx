import { useEffect, useState } from 'react';
import { Cutoff } from './Cutoff';
import { Progress } from './Progress';
import { Title } from './Title';

export const Bar = ({ GMLP }) => {
  const [width, setWidth] = useState(0);

  const onResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 font-semibold'>
      {width < 1024 ? <Title /> : <Progress />}
      {width < 1024 ? <Progress /> : <Title />}
    </div>
  );
};
