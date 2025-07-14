import { createConnection } from "mysql2";

const _connection = createConnection({
  database: 'test',
  dateStrings: true, // Set to true to return ISO Strings instead of Date objects, 
  host: 'localhost',
  user: 'root'
});