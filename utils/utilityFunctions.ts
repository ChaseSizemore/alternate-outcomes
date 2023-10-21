/**
 * Converts a ReadableStream to a JSON object.
 * @param {ReadableStream} stream - The ReadableStream to convert.
 * @returns {Promise<any>} - A Promise that resolves to the JSON object.
 */

async function streamToJson(stream: ReadableStream): Promise<any> {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }
  return JSON.parse(result);
}

/**
 * Calculates the average salary from an array of objects containing a salary property.
 * @param array - The array of objects to calculate the average salary from.
 * @returns A formatted string representing the average salary in USD.
 */

const getAverageSalary = (array: any[]) => {
  let total = 0;
  array.forEach((item: any) => {
    total += parseInt(item.salary, 10);
  });
  let result = Math.floor(total / array.length);
  let formatted = result.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatted;
};

/**
 * Opens the bootcamp website in a new tab when clicked.
 * @returns {void}
 */

type Bootcamp = {
  website: string;
  description: string;
  averageSalary: string;
  name: string;
};
const handleWebsiteClick = (bootcamp: Bootcamp) => {
  window.open(bootcamp.website, '_blank');
};

export { streamToJson, getAverageSalary, handleWebsiteClick };
