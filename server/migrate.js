const mysql = require("mysql2");

// Create connection without specifying database first
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shashank_2205"
});

connection.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");

  // Step 1: Create database if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS placement_tracker", (err) => {
    if (err) {
      console.error("Error creating database:", err);
      process.exit(1);
    }
    console.log("✓ Database placement_tracker ensured");

    // Step 2: Use the database
    connection.query("USE placement_tracker", (err) => {
      if (err) {
        console.error("Error selecting database:", err);
        process.exit(1);
      }
      console.log("✓ Using placement_tracker database");

      // Step 3: Check if users table exists and add role column if missing
      connection.query(
        "SHOW COLUMNS FROM users LIKE 'role'",
        (err, results) => {
          if (err) {
            // Table might not exist, create it
            console.log("Creating users table...");
            connection.query(
              `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255),
                role ENUM('user', 'admin') DEFAULT 'user'
              )`,
              (err) => {
                if (err) {
                  console.error("Error creating users table:", err);
                  process.exit(1);
                }
                console.log("✓ Users table created with role column");
                insertTestData();
              }
            );
          } else if (results.length === 0) {
            // Table exists but role column missing - add it
            console.log("Adding role column to users table...");
            connection.query(
              "ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user'",
              (err) => {
                if (err) {
                  console.error("Error adding role column:", err);
                  process.exit(1);
                }
                console.log("✓ Role column added to users table");
                insertTestData();
              }
            );
          } else {
            // Role column already exists
            console.log("✓ Role column already exists");
            insertTestData();
          }
        }
      );
    });
  });

  function insertTestData() {
    // Insert test users if they don't exist
    const testUsers = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user"
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
      }
    ];

    let completed = 0;
    testUsers.forEach((user) => {
      const sql =
        "INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      connection.query(
        sql,
        [user.name, user.email, user.password, user.role],
        (err) => {
          completed++;
          if (err) {
            console.error(`Error inserting user ${user.email}:`, err);
          } else {
            console.log(`✓ User ${user.email} ensured (role: ${user.role})`);
          }

          if (completed === testUsers.length) {
            console.log("\n✅ Database migration complete!");
            console.log("\nTest Credentials:");
            console.log("  User:  john@example.com / password123");
            console.log("  Admin: admin@example.com / admin123");
            connection.end();
            process.exit(0);
          }
        }
      );
    });
  }
});
