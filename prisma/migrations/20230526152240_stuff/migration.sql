/*
  Warnings:

  - You are about to drop the column `musicspaces_username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `spotify_username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[musicspacesUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessTokenExpiration` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicspacesUsername` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyUsername` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_musicspaces_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "musicspaces_username",
DROP COLUMN "spotify_username",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "accessTokenExpiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "musicspacesUsername" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "spotifyUsername" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_musicspacesUsername_key" ON "User"("musicspacesUsername");
