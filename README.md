# Technical Assessment

## Getting Started
- Run npm start, this will start the server.
- Run npm test to run the mocha testing.

## Using the API

### Generating token
This is a private API so to validate each request you have to add a key 'authorization' with a generated token.
To generate the token follow this steps.
- Create a var with current date/time.
```javascript
var dateToken = new Date().toString();
```
- Now append your new var with the Secret Key.
- Create a hash using MD5 Hex. Example using crypto module in NodeJS.
```javascript
crypto.createHash('md5').update(req.body.date + configEnv.secretApiKey).digest('hex');
```
- Send the dateToken string within the object to the server so it will be used to validate the token.

### Available Methods
#### User Create

Post method to /api/user
Request:
```javascript
var userObj = {
  'name': 'test name',
  'avatar': 'test avatar',
  'date': dateToken //This was generated earlier must be generated in each request.
};
```
Response:
```javascript
{
    success: true,
    message: '',
    user: {
      'name': 'test name',
      'avatar': 'test avatar',
      '_id': '68976897ya78dsagdasdadsa'
    }
}
```

Post method to /api/article
Request:
```javascript
var artObj = {
	'_userId': _userId,
	'title': 'testing article',
	'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	'tags': ['lorem', 'test', 'technical', 'assessment'],
	'date': dateToken //This was generated earlier must be generated in each request.
};
```
Response:
```javascript
{
    success: true,
    message: '',
    article: {
      '_userId': '68976897ya78dsagdasdadsa',
      'title': 'testing article',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'tags': ['lorem', 'test', 'technical', 'assessment'],
      '_id': '68976897ya7ewq312321sa'
    }
}
```

Put method to /api/article/:id
Request:
```javascript
var artObj = {
	'title': 'testing article',
	'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	'tags': ['lorem', 'test', 'technical', 'assessment'],
	'date': dateToken //This was generated earlier must be generated in each request.
};
```
Response:
```javascript
{
    success: true,
    message: '',
    article: {
      '_userId': '68976897ya78dsagdasdadsa',
      'title': 'testing article',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'tags': ['lorem', 'test', 'technical', 'assessment'],
      '_id': '68976897ya7ewq312321sa'
    }
}
```

Get method to /api/article/:tag
Request:
```javascript
var artObj = {
	'date': dateToken //This was generated earlier must be generated in each request.
};
```
Response:
```javascript
{
    success: true,
    message: '',
    articles: [{
      '_userId': '68976897ya78dsagdasdadsa',
      'title': 'testing article',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'tags': ['lorem', 'test', 'technical', 'assessment'],
      '_id': '68976897ya7ewq312321sa'
    },
    {
      '_userId': '68976897ya78dsagdasdadsa',
      'title': 'testing article',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'tags': ['lorem', 'test', 'technical', 'assessment'],
      '_id': '68976897ya7ewq312321sa'
    },
    {
      '_userId': '68976897ya78dsagdasdadsa',
      'title': 'testing article',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'tags': ['lorem', 'test', 'technical', 'assessment'],
      '_id': '68976897ya7ewq312321sa'
    }]
}
```

Delete method to /api/article/:id
Request:
```javascript
var artObj = {
	'date': dateToken //This was generated earlier must be generated in each request.
};
```
Response:
```javascript
{
    success: true,
    message: ''
}
```
