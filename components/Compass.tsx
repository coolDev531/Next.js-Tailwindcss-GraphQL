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
        width: '80%',
        height: '100%',
        backgroundImage: `url(http://i.imgur.com/44nyA.jpg)`,
        backgroundSize: '100% 100%',
      }}>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
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
