-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "spotify_username" TEXT NOT NULL,
    "musicspaces_username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_musicspaces_username_key" ON "User"("musicspaces_username");
