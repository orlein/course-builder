import { relations } from "drizzle-orm/relations";
import { usersInAuth, memo } from "./schema";

export const memoRelations = relations(memo, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [memo.userId],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	memos: many(memo),
}));