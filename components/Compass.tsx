import Image from 'next/image';
import { Card, Metric, Text, Color } from '@tremor/react';

type Props = {
  degrees: number;
  metric: string;
  title: string;
};

function Compass({ degrees, metric, title }: Props) {
  return (
    <div
      className={`relative`}
      style={{
        width: '100%',
        height: '100%',
        padding: "10px"
        // backgroundImage: `url(http://i.imgur.com/44nyA.jpg)`,
        // backgroundSize: '100% 100%',
      }}>
      <div
        className="select-none text-blue-500 font-bold
       absolute top-0 left-[50%]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        N
      </div>
      <div
        className="select-none text-blue-500 font-bold
       absolute top-[50%] right-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        E
      </div>
      <div
        className="select-none text-blue-500 font-bold
  absolute bottom-0 left-[50%]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        S
      </div>
      <div
        className="select-none text-blue-500 font-bold
 absolute top-[50%] left-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}>
        W
      </div>

      {/* <Text className="">{title}</Text> */}
      {/* <Metric className="text-black absolute bottom-0 right-0">{metric}</Metric> */}
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
