-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('PRESENCIAL', 'ONLINE');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'administrativo',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceiroUsuarios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "diaPagamento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceiroUsuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NiveisAcesso" (
    "id" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL,

    CONSTRAINT "NiveisAcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargos" (
    "id" SERIAL NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceiroAluno" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "qtdAulas" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "diaVencimento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceiroAluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "escola" TEXT NOT NULL,
    "ano_escolar" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" JSONB NOT NULL,
    "ficha" TEXT NOT NULL,
    "modalidade" JSONB NOT NULL DEFAULT '{"presencial": true, "online": true}',
    "password" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "dataInicioAulas" TIMESTAMP(3),
    "dificuldades" TEXT[],
    "accessLevel" TEXT NOT NULL DEFAULT 'aluno',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisRequisitados" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "concluidoPor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MateriaisRequisitados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaAulas" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFinal" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "duracao" DOUBLE PRECISION NOT NULL,
    "valor_aula" DOUBLE PRECISION NOT NULL,
    "materia" TEXT NOT NULL,
    "modalidade" "Modalidade" NOT NULL,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "cancelada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgendaAulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Valores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Valores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" JSONB NOT NULL,
    "password" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'responsavel',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControleAlunos" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "desativadoPor" TEXT NOT NULL,
    "desativadoEm" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ControleAlunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControleProfessores" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "desativadoPor" TEXT NOT NULL,
    "desativadoEm" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ControleProfessores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "autonomia" TEXT NOT NULL,
    "concentracao" TEXT NOT NULL,
    "engajamentoAulas" TEXT NOT NULL,
    "interpretacao" TEXT NOT NULL,
    "desenvolvimento" TEXT NOT NULL,
    "comentarios" TEXT NOT NULL,
    "materiaisSugeridos" TEXT NOT NULL,
    "proximosPassos" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagamentosAluno" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "lancadoPor" TEXT NOT NULL,
    "codigoIdentificador" TEXT NOT NULL,
    "observacao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "anoReferencia" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PagamentosAluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenRecuperacao" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "utilizado" BOOLEAN NOT NULL DEFAULT false,
    "validoAte" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenRecuperacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceiroProfessor" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "valor_transporte" DOUBLE PRECISION NOT NULL,
    "status_aula" TEXT NOT NULL,
    "referenciaSemana" TEXT NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceiroProfessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" JSONB NOT NULL,
    "areaFormacao" JSONB[],
    "turmas_habilitadas" TEXT[],
    "img_url" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "disponibilidade" JSONB NOT NULL DEFAULT '{"segunda": {"manha": false, "tarde": true, "noite": false}, "terca": {"manha": false, "tarde": true, "noite": false}, "quarta": {"manha": false, "tarde": true, "noite": false}, "quinta": {"manha": false, "tarde": true, "noite": false}, "sexta": {"manha": false, "tarde": true, "noite": false}, "sabado": {"manha": true, "tarde": false, "noite": false}}',
    "ficha" JSONB[],
    "accessLevel" TEXT NOT NULL DEFAULT 'professor',
    "modalidade" JSONB NOT NULL DEFAULT '{"presencial": true, "online": false}',
    "password" TEXT NOT NULL,
    "materias" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materias" (
    "id" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metas" (
    "id" TEXT NOT NULL,
    "faturamento" DOUBLE PRECISION NOT NULL,
    "vendas" INTEGER NOT NULL,
    "alunosAtivos" INTEGER NOT NULL,
    "mesAno" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "telefoneCliente" TEXT NOT NULL,
    "emailCliente" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimentos" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL,
    "tipoAtendimento" TEXT NOT NULL,
    "descricaoAtendimento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaAulas_professorId_data_horaInicio_horaFinal_key" ON "AgendaAulas"("professorId", "data", "horaInicio", "horaFinal");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_email_key" ON "Responsavel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_cpf_key" ON "Responsavel"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "TokenRecuperacao_token_key" ON "TokenRecuperacao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_cpf_key" ON "Professor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Metas_mesAno_key" ON "Metas"("mesAno");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_emailCliente_key" ON "Lead"("emailCliente");

-- AddForeignKey
ALTER TABLE "FinanceiroUsuarios" ADD CONSTRAINT "FinanceiroUsuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceiroAluno" ADD CONSTRAINT "FinanceiroAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisRequisitados" ADD CONSTRAINT "MateriaisRequisitados_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisRequisitados" ADD CONSTRAINT "MateriaisRequisitados_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaAulas" ADD CONSTRAINT "AgendaAulas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaAulas" ADD CONSTRAINT "AgendaAulas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControleAlunos" ADD CONSTRAINT "ControleAlunos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControleProfessores" ADD CONSTRAINT "ControleProfessores_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagamentosAluno" ADD CONSTRAINT "PagamentosAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagamentosAluno" ADD CONSTRAINT "PagamentosAluno_lancadoPor_fkey" FOREIGN KEY ("lancadoPor") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceiroProfessor" ADD CONSTRAINT "FinanceiroProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceiroProfessor" ADD CONSTRAINT "FinanceiroProfessor_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "AgendaAulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimentos" ADD CONSTRAINT "Atendimentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
