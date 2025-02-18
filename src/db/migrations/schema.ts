import { pgTable, foreignKey, unique, pgPolicy, timestamp, text, uuid, bigint, date, numeric, serial } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const memo = pgTable("memo", {
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	title: text(),
	content: text(),
	userId: uuid("user_id").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "memo_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "memo_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("memo_id_key").on(table.id),
	pgPolicy("Memo open to self", { as: "permissive", for: "all", to: ["authenticated"], using: sql`(( SELECT auth.uid() AS uid) = user_id)`, withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
]);

export const foodAdminAction = pgTable("food_admin_action", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "food_admin_action_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	actionDate: date("action_date"),
	actionId: text("action_id"),
	"businessItem": text("business_item"),
	businessType: text("business_type"),
	businessName: text("business_name"),
	addressRoad: text("address_road"),
	addressJibun: text("address_jibun"),
	adminGuidanceDate: date("admin_guidance_date"),
	adminActionDate: text("admin_action_date"),
	adminActionName: text("admin_action_name"),
	legalBasis: text("legal_basis"),
	violationDate: text("violation_date"),
	violationContent: text("violation_content"),
	adminActionContent: text("admin_action_content"),
	adminActionDateRange: text("admin_action_date_range"),
	businessSiteArea: numeric("business_site_area"),
	adminActionStatus: text("admin_action_status"),
	businessItem: text("business_item"),
}, (table) => [
	pgPolicy("Delete only for admin", { as: "permissive", for: "delete", to: ["public"], using: sql`(( SELECT (auth.jwt() ->> 'role'::text)) = 'admin'::text)` }),
	pgPolicy("Insert only for admin", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Read Food Safety Data Seoul", { as: "permissive", for: "select", to: ["anon", "authenticated"] }),
	pgPolicy("Update only for admin", { as: "permissive", for: "update", to: ["public"] }),
]);

export const drizzleMigrations = pgTable("__drizzle_migrations", {
	id: serial().primaryKey().notNull(),
	hash: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdAt: bigint("created_at", { mode: "number" }),
});
