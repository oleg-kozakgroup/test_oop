const AbstractSorter = require("./AbstractSorter");

class AddressSorter extends AbstractSorter {
  constructor(x, y) {
    super();
    if(!isFinite(x) || !isFinite(y)){
      throw new Error('Entered coordinates are invalid');
    }
    this.x = x;
    this.y = y;
  }

  get delimiter() {
    return /,/;
  }

  get fieldList() {
    return [
      { name: 'address', type: 'string' },
      { name: 'x', type: 'float' },
      { name: 'y', type: 'float' },
    ];
  }

  sortCallback(data) {
    const mappedData = data.map(({ x, y, address }) => {
      const xDiff = this.x - x;
      const yDiff = this.y - y;
      const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      return { address, distance };
    });
    return mappedData.sort(({distance: aDist},{ distance: bDist }) => {
      if(aDist < bDist){
        return -1;
      }
      return +(aDist > bDist);
    })
  }
}

module.exports = AddressSorter;