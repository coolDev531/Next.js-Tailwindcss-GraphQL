'use client'; // tremor.so/docs/getting-started/installation
import { useState } from 'react';
import { Card, Divider, Subtitle, Text, Button } from '@tremor/react';
import CityPicker from '@/components/CityPicker';
import { useRouter } from 'next/navigation';
import getBasePath from '@/lib/getBasePath';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onMyLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setIsLoading(true);
        const { city } = await fetch(
          `${getBasePath()}/api/reverseGeoCode?lat=${latitude}&long=${longitude}`
        ).then((r) => r.json());

        router.push(`/location/${city}/${latitude}/${longitude}`);
        setIsLoading(false);
      });
    } else {
      // users browser doesn't support Geolocation
      alert('Your browser does not support Geolocation!');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#1f1f1f] p-10 flex flex-col
    justify-center items-center
    ">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-4xl md:text-6xl font-bold text-center mb-10 text-white">
          AtmosTrend
        </Text>
        <Subtitle className="text-xl text-center text-white">
          Powered by OpenAI, Next.js 13.4, Tailwind CSS, Tremor 2.0 & More!
        </Subtitle>

        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#f961e4] to-[#4063F2]">
          <CityPicker />
        </Card>

        <Text className="text-4xl font-bold text-center mb-4 mt-4 text-white">
          OR
        </Text>

        <Button
          className="w-full text-white bg-gradient-to-br from-[#f961e4] to-[#4063F2]"
          onClick={onMyLocationClick}
          disabled={isLoading}>
          {!isLoading
            ? `Get My Current Location's Weather`
            : `Loading... hold on!`}
        </Button>
      </Card>
    </div>
  );
}
