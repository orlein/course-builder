CREATE TABLE "memo" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"title" text,
	"content" text,
	"user_id" uuid NOT NULL,
	"id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "memo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"pin_id" bigint,
	CONSTRAINT "memo_id_key" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "memo" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "pins" (
	"id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "pins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"title" text,
	"content" text,
	"user_id" uuid NOT NULL,
	"latitude" numeric,
	"longitude" numeric,
	CONSTRAINT "pins_id_key" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "pins" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "memo" ADD CONSTRAINT "memo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "memo" ADD CONSTRAINT "memo_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "public"."pins"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pins" ADD CONSTRAINT "pins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE POLICY "Memo open to self" ON "memo" AS PERMISSIVE FOR ALL TO "authenticated" USING ((( SELECT auth.uid() AS uid) = user_id)) WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));--> statement-breakpoint
CREATE POLICY "Pins open to self" ON "pins" AS PERMISSIVE FOR ALL TO "authenticated" USING ((( SELECT auth.uid() AS uid) = user_id)) WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));