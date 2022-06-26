const dotenv = require("dotenv");
dotenv.config();
const env = {
            DB_USERNAME : process.env.DB_USERNAME,
            DB_PASSWORD : process.env.DB_PASSWORD,
            DB_HOST : process.env.DB_HOST,
            PORT : process.env.PORT,
            GREETING:'hello',
            FAREWELL:'goodbay'
            };
module.exports=env;