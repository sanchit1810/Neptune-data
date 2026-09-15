import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organisation: text("organisation").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  source: text("source").notNull(),
  payloadHash: text("payload_hash").notNull(),
  createdAt: integer("created_at").notNull(),
});
