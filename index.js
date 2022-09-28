const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './src/Config/config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});