import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';
import WindSpeedCard from '@/components/WindSpeedCard';
import celsiusToFahrenheit from '@/lib/convertCelciusToFarenheit';
import kmhToMph from '@/lib/kmhToMph';
import { Root } from '@/types/weather';

interface Props {
  results: Root;
}

function WeatherStats({ results }: Props) {
  const farenheitMax = celsiusToFahrenheit(
    results.daily.temperature_2m_max[0]
  ).toFixed(1);
  const farenheitMin = celsiusToFahrenheit(
    results.daily.temperature_2m_min[0]
  ).toFixed(1);

  const windspeedMPH = kmhToMph(results.current_weather.windspeed).toFixed(1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
      <StatCard
        title="Maximum Temperature"
        metric={`${farenheitMax}°`}
        color="yellow"
      />

      <StatCard
        title="Minimum Temperature"
        metric={`${farenheitMin}°`}
        color="green"
      />

      <div>
        <StatCard
          title="UV Index"
          metric={results.daily.uv_index_max[0].toFixed(1)}
          color="rose"
        />
        {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
          <CalloutCard
            message={'The UV is high today, be sure to wear SPF!'}
            warning
          />
        )}
      </div>

      <div className="flex space-x-3">
        <StatCard
          title="Wind Speed"
          metric={`${windspeedMPH}mph`}
          color="cyan"
        />

        <WindSpeedCard
          title="Wind Direction"
          metric={`${results.current_weather.winddirection.toFixed(1)}°`}
          color="violet"
          degrees={results.current_weather.winddirection}
        />
      </div>
    </div>
  );
}

export default WeatherStats;
