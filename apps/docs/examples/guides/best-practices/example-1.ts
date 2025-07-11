const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  dateStrings: true // Set to true to return ISO Strings instead of Date objects
});
