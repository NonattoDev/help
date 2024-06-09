import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, params: any) {
  const professorAtualizado = await request.json();
  const idProfessor = params.params.id;

  try {
    const professor = await prisma.professor.update({
      where: { id: idProfessor },
      data: {
        nome: professorAtualizado.nome,
        email: professorAtualizado.email,
        cpf: professorAtualizado.cpf,
        telefone: professorAtualizado.telefone,
        endereco: professorAtualizado.endereco,
        areaFormacao: professorAtualizado.areaFormacao,
        ativo: professorAtualizado.ativo,
        disponibilidade: professorAtualizado.disponibilidade,
        ficha: professorAtualizado.ficha,
        modalidade: professorAtualizado.modalidade,
        password: professorAtualizado.password,
        materias: {
          upsert: professorAtualizado.materias.map((materia: any) => ({
            where: {
              professorId_materiaId: {
                professorId: idProfessor,
                materiaId: materia.id,
              },
            },
            update: {
              materia: {
                update: {
                  materia: materia.materia,
                },
              },
            },
            create: {
              materia: {
                connectOrCreate: {
                  where: { id: materia.id },
                  create: { id: materia.id, materia: materia.materia },
                },
              },
            },
          })),
        },
      },
    });

    if (!professor) {
      await prisma.$disconnect();
      return new Response(JSON.stringify({ error: "Professor não encontrado" }), { status: 404 });
    }

    await prisma.$disconnect();
    return new Response(JSON.stringify(professor), { status: 200 });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar o professor" }), { status: 500 });
  }
}
