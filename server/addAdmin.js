const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shashank_2205",
  database: "placement_tracker"
});

connection.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }

  // Check existing users
  connection.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      process.exit(1);
    }

    console.log("Current users in database:");
    console.log("==============================");
    results.forEach((user) => {
      console.log(`ID: ${user.id} | Email: ${user.email} | Role: ${user.role}`);
    });
    console.log("==============================\n");

    // Add your email as admin
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE role = ?, password = ?";

    connection.query(
      sql,
      [
        "Shashank",
        "shashankgoud@gmail.com",
        "password123",
        "admin",
        "admin",
        "password123"
      ],
      (err) => {
        if (err) {
          console.error("Error adding user:", err);
          process.exit(1);
        }

        console.log("✅ User added/updated successfully!\n");
        console.log("Admin Credentials:");
        console.log("  Email: shashankgoud@gmail.com");
        console.log("  Password: password123");
        console.log("  Role: admin\n");

        connection.end();
        process.exit(0);
      }
    );
  });
});
