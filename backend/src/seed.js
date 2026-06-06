// Populates the database with sample content so the site looks complete.
// Run with:  npm run seed
import bcrypt from "bcryptjs";
import { query, pool } from "./db.js";

async function seed() {
  console.log("🌱 Seeding database...");

  // Helper for bulk inserts: builds (?, ?), ... placeholders and flattens values
  async function bulkInsert(table, columns, rows) {
    if (!rows || rows.length === 0) return;
    const placeholders = rows.map(r => `(${r.map(() => '?').join(',')})`).join(',');
    const flat = rows.flat();
    const cols = columns.join(', ');
    await query(`INSERT INTO ${table} (${cols}) VALUES ${placeholders}`, flat);
  }
  // Admin user
  const [{ count }] = await query("SELECT COUNT(*) AS count FROM users");
  if (Number(count) === 0) {
    const hash = await bcrypt.hash("admin123", 10);
    await query("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')", [
      "admin@school.com",
      hash,
    ]);
    console.log("   • Admin created  ->  admin@school.com / admin123");
  }

  await query("DELETE FROM notifications");
  await bulkInsert(
    'notifications',
    ['title', 'content'],
    [
      ["Admissions open for 2026-27", "Apply online before 30th June. Limited seats available."],
      ["Annual Sports Day", "Annual Sports Day will be held on 12th July on the main ground."],
      ["Class 10 Results Declared", "Congratulations to all our students on outstanding results!"],
      ["Parent-Teacher Meeting", "PTM scheduled for Saturday, 21st June at 10:00 AM."],
    ]
  );

  await query("DELETE FROM achievements");
  await bulkInsert(
    'achievements',
    ['title', 'description', 'category', 'achieved_on'],
    [
      ["ISO 9001:2015 Certification", "Awarded for excellence in educational management.", "certification", "2025-03-15"],
      ["Best School Award 2025", "Recognised as the Best CBSE School in the district.", "award", "2025-02-10"],
      ["State Science Olympiad Winners", "Our students secured top ranks in the State Science Olympiad.", "award", "2025-01-20"],
    ]
  );

  await query("DELETE FROM events");
  await bulkInsert(
    'events',
    ['title', 'description', 'event_date'],
    [
      ["Annual Day Celebration", "A grand evening of music, dance and drama by our students.", "2026-07-25"],
      ["Science Exhibition", "Students showcase innovative projects and experiments.", "2026-08-14"],
      ["Independence Day", "Flag hoisting and cultural programme.", "2026-08-15"],
    ]
  );

  await query("DELETE FROM student_results");
  await bulkInsert(
    'student_results',
    ['name', 'marks', 'grade', '`rank`', 'details', 'is_topper'],
    [
      ["Aarav Sharma", "98.4%", "A1", 1, "School topper, perfect score in Mathematics.", true],
      ["Diya Patel", "97.8%", "A1", 2, "Excelled in Science and Social Studies.", true],
      ["Rohan Verma", "97.2%", "A1", 3, "Outstanding all-round performance.", true],
      ["Ananya Gupta", "95.6%", "A1", 4, "Top scorer in English.", false],
      ["Kabir Singh", "94.8%", "A2", 5, "Excellent in Computer Science.", false],
      ["Ishita Roy", "94.2%", "A2", 6, "Consistent academic performer.", false],
      ["Vivaan Mehta", "93.6%", "A2", 7, "Strong in Mathematics and Science.", false],
      ["Saanvi Nair", "93.0%", "A2", 8, "All-round achiever.", false],
    ]
  );

  await query("DELETE FROM admissions");
  await bulkInsert(
    'admissions',
    ['title', 'content', 'category', 'sort_order'],
    [
      ["Eligibility", "Open to students from Nursery to Class 12. Age criteria as per CBSE norms.", "eligibility", 1],
      ["Required Documents", "Birth certificate, previous report card, transfer certificate, passport photos.", "documents", 2],
      ["Admission Process", "1. Fill the application form. 2. Entrance interaction. 3. Document verification. 4. Fee payment.", "process", 3],
      ["Fee Structure", "Affordable fee structure with scholarships for meritorious students.", "fees", 4],
    ]
  );

  const existingInfo = await query("SELECT id FROM contact_info LIMIT 1");
  if (!existingInfo.length) {
    await query(
      "INSERT INTO contact_info (address, phone, email) VALUES (?, ?, ?)",
      ["Sri Vidya E.M & T.M High School, Vidyanagar, Penumuru, Andhra Pradesh", "+91 98765 43210", "info@school.com"]
    );
  }

  console.log("✅ Seed complete.");
  await pool.end();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});