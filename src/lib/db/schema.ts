import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userTable = pgTable("users", {
  id: serial("id"),
  email: varchar("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  isDeliveryDriver: boolean("is_delivery_driver").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export type User = typeof userTable.$inferSelect;
