/*
  Warnings:

  - You are about to drop the column `checkin` on the `AgendaAulas` table. All the data in the column will be lost.
  - You are about to drop the column `checkout` on the `AgendaAulas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[professorId,data,hora]` on the table `AgendaAulas` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `modalidade` on the `AgendaAulas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('PRESENCIAL', 'ONLINE');

-- AlterTable
ALTER TABLE "AgendaAulas" DROP COLUMN "checkin",
DROP COLUMN "checkout",
ADD COLUMN     "cancelada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "finalizada" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "modalidade",
ADD COLUMN     "modalidade" "Modalidade" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AgendaAulas_professorId_data_hora_key" ON "AgendaAulas"("professorId", "data", "hora");
