/*
  Warnings:

  - Added the required column `titulo` to the `MateriaisRequisitados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MateriaisRequisitados" ADD COLUMN     "titulo" TEXT NOT NULL;
