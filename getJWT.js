const request = require('sync-request');
const success = 200;

//Making POST request to get JWT
const getJWT = JWTurl => {
    const res = request('POST', JWTurl,null);
    if (res.statusCode == success) {
        const data = JSON.parse(res.getBody('utf8'));
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
        throw err;
    }
}

module.exports.getJWT=getJWT;
