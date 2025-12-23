const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Quiz App API',
      version: '1.0.0',
      description: 'API documentation for the AI Quiz App',
    },
    servers: [
      { url: 'http://localhost:3000/api' }
    ],
  },
  apis: ['./src/routes/*.js'], // You can use JSDoc comments in your route files for more detail
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
