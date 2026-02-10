const log = require("npmlog");
const fs = require("fs");
const path = require("path");

// Define the path to the error log file
const logFilePath = path.join(__dirname, "../logs/error.log");

// Configure npmlog to write logs to the error log file
log.stream = fs.createWriteStream(logFilePath, { flags: "a" });

// Export the configured logger
module.exports = log;