import axios from 'axios';
import { createConnection } from 'mysql2';
import 'dotenv/config';

const countries = [
  'argentina',
  'brazil',
  'chile',
  'colombia',
  'paraguay',
  'peru',
  'suriname',
  'uruguay',
];

const apiUrl = 'http://universities.hipolabs.com/search?country=';

const databaseConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
};

async function connectToDatabase() {
  const connection = createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Connected to database');
      resolve(connection);
    });
  });
}

async function createDatabase(connection) {
  // Create the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseConfig.database}`,
      (err) => {
        if (err) {
          console.error('Error creating database:', err);
          return;
        }
        console.log('Database created');
      },
    );
  });
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Disconnected from database');
  });
}

async function createTables(connection) {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');

    // Use the created database
    connection.query(`USE ${databaseConfig.database}`, (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Using database');

      // Create the last_update table if it doesn't exist
      const createLastUpdateTableQuery = `
                CREATE TABLE IF NOT EXISTS last_update (
                id INT AUTO_INCREMENT PRIMARY KEY,
                timestamp DATETIME
                )
              `;

      connection.query(createLastUpdateTableQuery, (error, results) => {
        if (error) {
          console.error('Error creating last_update table:', error);
          return;
        }
        const tableExists = results[0];
        tableExists && console.log(tableExists);
      });

      const tableName = 'universities';

      const checkTableExistsQuery = `SELECT COUNT(*) AS tableExists FROM information_schema.tables WHERE table_schema = '${databaseConfig.database}' AND table_name = '${tableName}'`;

      connection.query(checkTableExistsQuery, function (error, results) {
        if (error) {
          console.error(error);
          return;
        }

        const tableExists = results[0].tableExists;

        if (tableExists) {
          console.log(`${tableName} table already exists`);
        } else {
          const createTableQuery = `
              CREATE TABLE ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                domains VARCHAR(255),
                name VARCHAR(255),
                alpha_two_code VARCHAR(255),
                state_province VARCHAR(255),
                country VARCHAR(255),
                web_pages VARCHAR(255)
              )`;
          connection.query(createTableQuery, function (error: any) {
            if (error) {
              console.error(error);
              return;
            }

            console.log(`${tableName} table created`);
          });
        }
      });
    });
  });
}

async function fetchUniversities(country: string) {
  try {
    const response = await axios.get(apiUrl + country);
    return response.data;
  } catch (error) {
    console.error(`Error fetching universities for ${country}:`, error);
    return null;
  }
}

async function saveUniversities(connection, universities: any[]) {
  // Prepare the universities data for insertion
  const universitiesData = universities.map((university) => [
    String(university['domains']),
    university['name'],
    university['alpha_two_code'],
    university['state-province'],
    university['country'],
    String(university['web_pages']),
  ]);

  // Insert universities into the database
  const insertQuery = `INSERT INTO universities (domains, name, alpha_two_code, state_province, country, web_pages) VALUES (?)`;

  for (const item of universitiesData) {
    await connection.promise().query(insertQuery, [item]);
  }
}

function updateLastUpdated(connection) {
  const lastUpdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updateQuery = `INSERT INTO last_update (timestamp) VALUES (?)`;

  connection.query(updateQuery, [lastUpdate], (err: any) => {
    if (err) {
      console.error('Error inserting last_update:', err);
      return;
    } else {
      console.log('Last update inserted');
    }
  });
}

async function updateUniversitiesData(connection) {
  for (const country of countries) {
    const universities = await fetchUniversities(country);
    if (universities) {
      await saveUniversities(connection, universities);
    }
  }

  updateLastUpdated(connection);

  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Disconnected from database');
  });
}

(async () => {
  try {
    const connect: any = await connectToDatabase();

    await createDatabase(connect);

    const connection = createConnection(databaseConfig);

    await createTables(connection);

    console.log('Database and tables created');

    // Check if universities table already exists
    const checkTableExistsQuery = `SELECT COUNT(*) AS tableExists FROM information_schema.tables WHERE table_schema = '${databaseConfig.database}' AND table_name = 'universities'`;
    connection.query(checkTableExistsQuery, async function (error, results) {
      if (error) {
        console.error(error);
        connection.end();
        return;
      }
      const tableExists = results[0].tableExists;

      if (tableExists) {
        // Table exists, fetch existing universities
        const selectQuery = `SELECT name FROM universities`;
        connection.query(selectQuery, async (error, results: any) => {
          if (error) {
            console.error('Error selecting universities:', error);
            connection.end();
            return;
          }

          const existingUniversities = results.map(
            (result: { name: any }) => result.name,
          );

          for (const country of countries) {
            const universities = await fetchUniversities(country);
            if (universities) {
              // Filter out universities that already exist in the database
              const newUniversities = universities.filter(
                (university: { name: any }) =>
                  !existingUniversities.includes(university.name),
              );

              await saveUniversities(connection, newUniversities);
            }
          }

          updateLastUpdated(connection);

          connection.end();
        });
      } else {
        // Table doesn't exist, perform the update as usual
        await updateUniversitiesData(connection);

        connection.end();
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
