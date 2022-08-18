-- CreateTable
CREATE TABLE "platforms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "published_at" TIMESTAMP(0) NOT NULL,
    "document_id" VARCHAR(255),

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "platforms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_document_id_key" ON "platforms"("document_id");
