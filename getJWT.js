const request = require('sync-request');
const successStatusCode = 200;

//Making POST request to get JWT
const getJWT = JWTurl => {
    const response = request('POST', JWTurl,null);
    if (response.statusCode == successStatusCode) {
        const data = JSON.parse(response.getBody('utf8'));
        return data.jwt;
    }
    else {
        //Error handling if POST request fails
        const err = new Error(
          'getJWT: Server responded with status code ' +
            this.statusCode +
            ':\n' +
            this.body.toString(encoding)
        );
        err.statusCode = this.statusCode;
        err.headers = this.headers;
        err.body = this.body;
        console.error(`getJWT: ${err}`);
        console.log(`getJWT: ${err}`);
        throw err;
    }
}

module.exports.getJWT=getJWT;
