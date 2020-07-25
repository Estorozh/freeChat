#!/usr/bin/env node

// Request:
// {
//   "get": "randomString",  # Route
//   "length": 12345         # stringlength
// }
// Response:
// {
//   "code": 200,            # Response code
//   "message": "OK",        # Response message
//   "data": "abcde"         # Response data
// }
// 2. Error responses
// {
//   "code" : 12345,             # Error code
//   "message" : "Blabla error", # Error message
// }

let app = require('../index');
