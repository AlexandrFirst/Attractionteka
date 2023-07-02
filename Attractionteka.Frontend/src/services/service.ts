require("dotenv").config();

export class Service {
    static serverHost = process.env.DEVELOPMENT_SERVER_HOST || "//localhost:5000";
}