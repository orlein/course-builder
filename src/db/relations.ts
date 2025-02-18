import { relations } from 'drizzle-orm/relations';
import { authUsers } from 'drizzle-orm/supabase';
import { memo } from './schema';

export const memoRelations = relations(memo, ({ one }) => ({
  usersInAuth: one(authUsers, {
    fields: [memo.userId],
    references: [authUsers.id],
  }),
}));

export const usersInAuthRelations = relations(authUsers, ({ many }) => ({
  memos: many(memo),
}));
