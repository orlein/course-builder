import { sql } from 'drizzle-orm';
import {
  bigint,
  date,
  foreignKey,
  numeric,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

export const memo = pgTable(
  'memo',
  {
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).defaultNow(),
    title: text(),
    content: text(),
    userId: uuid('user_id').notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'memo_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      cache: 1,
    }),
    pinId: bigint({ mode: 'number' }),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [authUsers.id],
      name: 'memo_user_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    unique('memo_id_key').on(table.id),
    pgPolicy('Memo open to self', {
      as: 'permissive',
      for: 'all',
      to: ['authenticated'],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
      withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
    foreignKey({
      columns: [table.pinId],
      foreignColumns: [pins.id],
      name: 'memo_pin_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const pins = pgTable(
  'pins',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'pins_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      cache: 1,
    }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).defaultNow(),
    title: text(),
    content: text(),
    userId: uuid('user_id').notNull(),
    latitude: numeric('latitude'),
    longitude: numeric('longitude'),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [authUsers.id],
      name: 'pins_user_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    unique('pins_id_key').on(table.id),
    pgPolicy('Pins open to self', {
      as: 'permissive',
      for: 'all',
      to: ['authenticated'],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
      withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ],
);

export type Pin = typeof pins.$inferInsert;
