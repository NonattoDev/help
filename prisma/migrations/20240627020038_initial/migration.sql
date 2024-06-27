-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "diaInicio" DROP NOT NULL,
ALTER COLUMN "contrato" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "contrato" DROP NOT NULL;
