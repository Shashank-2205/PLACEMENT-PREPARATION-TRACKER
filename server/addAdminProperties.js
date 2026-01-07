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

  console.log("✓ Connected to database\n");
  console.log("📝 Adding columns to users table...\n");

  // Add columns one by one
  const addColumn = (columnDef) => {
    return new Promise((resolve) => {
      connection.query(columnDef, (err) => {
        if (!err) {
          console.log("✓ " + columnDef.split("ADD")[1].split(" ")[1]);
        }
        resolve();
      });
    });
  };

  const columns = [
    "ALTER TABLE users ADD COLUMN phone VARCHAR(20)",
    "ALTER TABLE users ADD COLUMN department VARCHAR(100)",
    "ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active'",
    "ALTER TABLE users ADD COLUMN permissions JSON",
    "ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  ];

  // Execute queries sequentially
  (async () => {
    for (const col of columns) {
      await addColumn(col);
    }

    console.log("\n📝 Adding admin users...\n");

    const adminUsers = [
      {
        name: "Shashank Admin",
        email: "shashankgoud@gmail.com",
        password: "password123",
        role: "admin",
        phone: "+91-9876543210",
        department: "Administration",
        permissions: JSON.stringify({
          canViewUsers: true,
          canCreateUsers: true,
          canDeleteUsers: true,
          canEditUsers: true,
          canViewReports: true,
          canManageSettings: true
        })
      },
      {
        name: "Super Admin",
        email: "superadmin@placement.com",
        password: "superadmin123",
        role: "admin",
        phone: "+91-8765432109",
        department: "System Administration",
        permissions: JSON.stringify({
          canViewUsers: true,
          canCreateUsers: true,
          canDeleteUsers: true,
          canEditUsers: true,
          canViewReports: true,
          canManageSettings: true,
          isSuperAdmin: true
        })
      },
      {
        name: "HR Manager",
        email: "hr@placement.com",
        password: "hr123456",
        role: "admin",
        phone: "+91-7654321098",
        department: "Human Resources",
        permissions: JSON.stringify({
          canViewUsers: true,
          canCreateUsers: true,
          canDeleteUsers: false,
          canEditUsers: true,
          canViewReports: true,
          canManageSettings: false
        })
      },
      {
        name: "Content Manager",
        email: "content@placement.com",
        password: "content123",
        role: "admin",
        phone: "+91-6543210987",
        department: "Content Management",
        permissions: JSON.stringify({
          canViewUsers: true,
          canCreateUsers: false,
          canDeleteUsers: false,
          canEditUsers: false,
          canViewReports: false,
          canManageSettings: false
        })
      },
      {
        name: "Analytics Admin",
        email: "analytics@placement.com",
        password: "analytics123",
        role: "admin",
        phone: "+91-5432109876",
        department: "Analytics",
        permissions: JSON.stringify({
          canViewUsers: true,
          canCreateUsers: false,
          canDeleteUsers: false,
          canEditUsers: false,
          canViewReports: true,
          canManageSettings: false
        })
      }
    ];

    let userCount = 0;

    adminUsers.forEach((admin) => {
      const sql = `
        INSERT INTO users (name, email, password, role, phone, department, permissions, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
        ON DUPLICATE KEY UPDATE 
        password = VALUES(password),
        phone = VALUES(phone),
        department = VALUES(department),
        permissions = VALUES(permissions)
      `;

      connection.query(
        sql,
        [
          admin.name,
          admin.email,
          admin.password,
          admin.role,
          admin.phone,
          admin.department,
          admin.permissions
        ],
        (err) => {
          userCount++;
          if (err) {
            console.error(`✗ Error: ${admin.email}:`, err.message);
          } else {
            console.log(`✓ ${admin.name}`);
            console.log(`  📧 ${admin.email} | 🔑 ${admin.password}`);
            console.log(`  🏢 ${admin.department} | ☎️ ${admin.phone}`);
            console.log("");
          }

          if (userCount === adminUsers.length) {
            console.log("✅ All admin users added!\n");
            console.log("Admin Credentials:");
            console.log("═══════════════════════════════════════════════════");
            adminUsers.forEach((admin) => {
              console.log(`${admin.name}: ${admin.email} / ${admin.password}`);
            });
            console.log("═══════════════════════════════════════════════════");
            connection.end();
            process.exit(0);
          }
        }
      );
    });
  })();
});
