import Image from 'next/image';
import { Metric } from '@tremor/react';

type Props = {
  degrees: number;
  metric: string;
  title: string;
};

function Compass({ degrees, metric }: Props) {
  return (
    <div
      className={`relative`}
      style={{
        width: '100%',
        height: '100%',
        padding: '10px',
      }}>
      <div
        className="select-none text-pink-500 font-bold
       absolute top-[10%] left-[50%]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        N
      </div>
      <div
        className="select-none text-pink-500 font-bold
       absolute top-[50%] right-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        E
      </div>
      <div
        className="select-none text-pink-500 font-bold
  absolute bottom-0 left-[50%]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        S
      </div>
      <div
        className="select-none text-pink-500 font-bold
 absolute top-[50%] left-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        W
      </div>
      <Metric
        className="text-white absolute bottom-0 right-0"
        style={{
          fontSize: '14px',
        }}>
        {metric}
      </Metric>
      <Image
        src="/compass-arrow.png"
        width={100}
        height={100}
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) rotate(${degrees}deg)`,
          left: '50%',
          top: '50%',
        }}
        alt="Picture of the compass arrow"
      />
    </div>
  );
}

export default Compass;
