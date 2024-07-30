-- CreateEnum
CREATE TYPE "OauthProvider" AS ENUM ('GOOGLE');

-- CreateEnum
CREATE TYPE "ShareableFileType" AS ENUM ('HTML', 'PDF', 'ZIP', 'IMAGE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DELETED', 'INACTIVE');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "oauth_provider" "OauthProvider" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_plans" (
    "user_plan_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "user_plans_pkey" PRIMARY KEY ("user_plan_id")
);

-- CreateTable
CREATE TABLE "plans" (
    "plan_id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "plans_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "shareables" (
    "shareable_id" SERIAL NOT NULL,
    "bucket_link" TEXT NOT NULL,
    "file_type" "ShareableFileType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "data" JSONB NOT NULL DEFAULT '{}',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "slug" TEXT NOT NULL,

    CONSTRAINT "shareables_pkey" PRIMARY KEY ("shareable_id")
);

-- CreateTable
CREATE TABLE "domains" (
    "domain_id" SERIAL NOT NULL,
    "domain_name" TEXT NOT NULL,
    "sub_domain" TEXT NOT NULL,
    "shareable_id" INTEGER NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "domains_pkey" PRIMARY KEY ("domain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_email_index" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_oauth_provider_index" ON "users"("oauth_provider");

-- CreateIndex
CREATE UNIQUE INDEX "user_plans_user_id_key" ON "user_plans"("user_id");

-- CreateIndex
CREATE INDEX "user_plan_user_id_index" ON "user_plans"("user_id");

-- CreateIndex
CREATE INDEX "user_plan_plan_id_index" ON "user_plans"("plan_id");

-- CreateIndex
CREATE INDEX "user_plan_plan_id_user_id_index" ON "user_plans"("plan_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_plans_user_id_plan_id_key" ON "user_plans"("user_id", "plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_slug_key" ON "plans"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "shareables_slug_key" ON "shareables"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "domains_shareable_id_key" ON "domains"("shareable_id");

-- CreateIndex
CREATE UNIQUE INDEX "domains_domain_name_sub_domain_key" ON "domains"("domain_name", "sub_domain");

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shareables" ADD CONSTRAINT "shareables_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domains" ADD CONSTRAINT "domains_shareable_id_fkey" FOREIGN KEY ("shareable_id") REFERENCES "shareables"("shareable_id") ON DELETE RESTRICT ON UPDATE CASCADE;
