const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = 3002; // Change the port number here if necessary

sequelize.authenticate().then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
