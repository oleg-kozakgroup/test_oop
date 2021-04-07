const AddressSorter = require("./AddressSorter");

const [x, y, url] = process.argv.slice(2);

(async function () {
  try {
    const results = await new AddressSorter(x, y).getSortedData(url);
    results.slice(0, 3).forEach(({ address, distance }) => console.log([address, distance.toFixed(4)].join(',')))
  } catch (e) {
    console.error(e);
  }
})()

