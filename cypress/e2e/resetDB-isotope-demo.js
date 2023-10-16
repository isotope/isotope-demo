const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  port: 3306, // Der Port der MySQL-Datenbank
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database server:", err);
    return;
  }

  console.log("Connected to the database server.");

  const fixtureFilePath = "cypress/fixtures/isotope-demo.sql";

  const dropDBSQL = "DROP DATABASE IF EXISTS `isotope-demo`;";
  connection.query(dropDBSQL, (dropErr) => {
    if (dropErr) {
      console.error("Error dropping the database:", dropErr);
      connection.end();
      return;
    }
    console.log("Database dropped successfully.");

    const createDBSQL = "CREATE DATABASE `isotope-demo`;";
    connection.query(createDBSQL, (createErr) => {
      if (createErr) {
        console.error("Error creating the database:", createErr);
        connection.end();
        return;
      }

      const useDBSQL = "USE `isotope-demo`;";
      connection.query(useDBSQL, (useErr) => {
        if (useErr) {
          console.error("Error using the database:", useErr);
          connection.end();
          return;
        }

        fs.readFile(fixtureFilePath, "utf-8", (readErr, sqlContent) => {
          if (readErr) {
            console.error("Error reading fixture file:", readErr);
            connection.end();
            return;
          }

          const resetDBSQL = `
            START TRANSACTION;
            ${sqlContent}
            COMMIT;
          `;

          connection.query(resetDBSQL, (queryErr) => {
            if (queryErr) {
              console.error("Error resetting the database:", queryErr);
            } else {
              console.log("Database reset successful.");
            }

            connection.end();
          });
        });
      });
    });
  });
});
