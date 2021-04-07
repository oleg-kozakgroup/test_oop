const HTTPClient = require("./HTTPClient");

class CSVLoader {
  constructor() {
    this.httpClient = new HTTPClient();
  }

  get delimiter() {
    throw new Error('Delimiter must be defined as a getter function');
  }

  get fieldList() {
    throw new Error('FieldsList must be defined as a getter function');
  }
  
  cast(value, type){
    switch (type){
      case 'string':
        return value.toString();
      case 'float':
        return parseFloat(value);
      default:
        throw new Error('Unsupported type of the data');
    }
  }

  parseCSV(strData) {
    const numberTypes = ['int', 'float'];
    const parsedResult = strData.split(/\r?\n|\r/).map((strRow) => strRow.split(this.delimiter));
    return parsedResult.map((values) => this.fieldList.reduce((obj, { name, type}, i) => {
      obj[name] = this.cast(values[i], type);
      if(numberTypes.includes(type) && isNaN(obj[name])){
        throw new Error('Invalid data');
      }
      return obj;
    }, {}))
  }

  async loadFile(url) {
      const result = await this.httpClient.get(url);
      return this.parseCSV(result);
  }
}

module.exports = CSVLoader;