const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Employee CRUD REST API",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger"
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: 'Development server'
        },
      ],
      components: {
        schemas: {
            Employees: {
                type: 'object',
                required: ['title', 'author', 'price', 'year_published'],
                properties: {
                    first_name: {
                        type: 'string',
                        description: 'The first name of the employee'
                    },
                    last_name: {
                        type: 'string',
                        description: 'The last name of the employee'
                    },
                    email: {
                        type: 'string',
                        description: 'The email of the employee'
                    },
                    phone: {
                        type: 'string',
                        description: 'The phone number of the book'
                    },
                    organization: {
                        type: 'string',
                        description: 'The organization of the employee'
                    },
                    designation: {
                        type: 'string',
                        description: 'The designation of the employee'
                    },
                    salary: {
                        type: 'float',
                        description: 'The salary of the employee'
                    },
                    status: {
                        type: 'number',
                        description: 'The status of the employee'
                    },
                },
                example: {
                    first_name: "Alok",
                    last_name: "Das",
                    email: "alok.cite@gmail.com",
                    phone: "9861928886",
                    organization: "Covalense global, Hyderbad",
                    designation: "PHP Developer",
                    salary: "119000.00",
                    status: 1
                }
            }
        },
        responses : {
            400: {
                description: 'Missing API key - include it in the Authorization header',
                contents: 'application/json'
            },
            401: {
                description: 'Unauthorized - incorrect API key or incorrect format',
                contents: 'application/json'
            },
            404: {
                description: 'Not found - the employee was not found',
                contents: 'application/json'
            },
            500: {
                description: 'Internal server error',
                contents: 'application/json'
            }
        },
      },
    },
    apis: ['./src/routes/employee.routes.ts'], // files containing annotations as above
}

// module.exports = options
export default options;  