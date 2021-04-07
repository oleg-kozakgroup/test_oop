const http = require("https");

class HTTPClient {
  parseResponse(resolve, reject){
    return (response) => {
      const strStatus = `${response.statusCode}`;
      const isError = strStatus.startsWith('4') || strStatus.startsWith('5');
      let data = '';
      response.on('data', (chunk) => data+=chunk);
      response.on('end', () => isError ? reject(data) : resolve(data));
    }
  }
  get(url){
    return new Promise((res, rej) => http.get(url, this.parseResponse(res, rej)));
  }
}

module.exports = HTTPClient;