import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  totalCredits: integer().default(3), // User gets 3 credits when they sign up for the first time.
});
