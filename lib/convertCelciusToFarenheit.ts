/**
 * This function takes in a number representing the temperature in Celsius and converts it to Fahrenheit.
 * The formula used is (celsius * 9) / 5 + 32.
 * @param celsius The temperature in Celsius to be converted to Fahrenheit.
 * @returns The temperature in Fahrenheit.
 */
export default function celsiusToFahrenheit(celsius: number) {
  // Multiply the celsius temperature by 9 to calculate the equivalent temperature in Fahrenheit if they had the same scale.
  // Since there are nine Fahrenheit degrees between each 5-degree increment in Celsius, this calculates the temperature in Fahrenheit as if Fahrenheit and Celsius had the same scale.
  const fahrenheitEquivalent = celsius * 9;
  // Divide the result by 5 to convert it to the correct Fahrenheit scale.
  const fahrenheit = fahrenheitEquivalent / 5;
  // Add 32 to the result to convert the temperature from Celsius to Fahrenheit.
  const fahrenheitFinal = fahrenheit + 32;
  // Return the calculated temperature in Fahrenheit.
  return fahrenheitFinal;
}
