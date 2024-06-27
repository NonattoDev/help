/*
  Warnings:

  - You are about to drop the column `diaInicio` on the `Aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "diaInicio",
ADD COLUMN     "dataInicioAulas" TIMESTAMP(3);
