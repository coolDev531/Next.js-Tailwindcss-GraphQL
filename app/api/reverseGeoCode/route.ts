import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { url } = request;
  const params = new URLSearchParams(url.split('?')[1]);
  const lat = params.get('lat');
  const long = params.get('long');

  const fetchUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${process.env.GEOAPIFY_API_KEY}`;

  const res = await fetch(fetchUrl, {
    method: 'GET',
  });

  const data = await res.json();
  const city = data.features[0].properties.city;

  return NextResponse.json({city});
}
