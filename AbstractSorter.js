const CSVLoader = require("./CSVLoader");


class AbstractSorter extends CSVLoader {
  sortCallback(){
    throw new Error('Sort callback must be specified');
  }
  getSortedData(url){
    return this.loadFile(url).then(this.sortCallback.bind(this));
  }
}

module.exports = AbstractSorter;