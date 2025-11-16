const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'library Api',
    description: 'library Api'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputfile, endpointsFiles, doc);