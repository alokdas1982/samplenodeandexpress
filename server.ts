import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc';

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
  
import options from './src/swagger';

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/test', (req, res) => {
    res.send('Server is running!');
  });

// Middleware for employee routes
import employeeRoutes from './src/routes/employee.routes';
app.use('/api/v1/employees', employeeRoutes);  
  
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});