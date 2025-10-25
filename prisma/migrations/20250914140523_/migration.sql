-- AlterTable
ALTER TABLE "public"."posts" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);
