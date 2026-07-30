import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlDir = join(__dirname, "..", "sql");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const files = readdirSync(sqlDir)
  .filter((name) => name.endsWith(".sql"))
  .sort();

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();

  for (const file of files) {
    const sql = readFileSync(join(sqlDir, file), "utf8");
    console.log(`Applying ${file}...`);
    await client.query(sql);
  }

  console.log("Migrations applied successfully.");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
