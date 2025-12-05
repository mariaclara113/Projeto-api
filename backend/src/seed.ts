import { prisma } from "./prismaClient";

async function main() {
  console.log("🟦 Limpando banco...");
  await prisma.ponto.deleteMany();
  await prisma.projeto.deleteMany();
  await prisma.extensionista.deleteMany();

  console.log("🟩 Criando extensionistas...");
  const extensionistas = await prisma.extensionista.createMany({
    data: [
      { nome: "João Silva", email: "joao@example.com", telefone: "11999990000" },
      { nome: "Maria Oliveira", email: "maria@example.com", telefone: "11988887777" },
      { nome: "Carlos Santos", email: "carlos@example.com", telefone: "11977776666" }
    ]
  });

  const ext1 = await prisma.extensionista.findFirst({ where: { email: "joao@example.com" } });
  const ext2 = await prisma.extensionista.findFirst({ where: { email: "maria@example.com" } });
  const ext3 = await prisma.extensionista.findFirst({ where: { email: "carlos@example.com" } });

  console.log("🟧 Criando projetos...");
  const projeto1 = await prisma.projeto.create({
    data: {
      nome: "Projeto Comunidade",
      descricao: "Projeto de apoio à comunidade local",
    }
  });

  const projeto2 = await prisma.projeto.create({
    data: {
      nome: "Projeto Educação",
      descricao: "Projeto de reforço escolar",
    }
  });

  console.log("🟫 Criando pontos...");
  await prisma.ponto.createMany({
    data: [
      {
        dataHora: new Date(),
        tipo: "ENTRADA",
        observacao: "Chegada para o projeto",
        extensionistaId: ext1!.id,
        projetoId: projeto1.id
      },
      {
        dataHora: new Date(),
        tipo: "SAIDA",
        observacao: "Saída do turno",
        extensionistaId: ext1!.id,
        projetoId: projeto1.id
      },
      {
        dataHora: new Date(),
        tipo: "ENTRADA",
        observacao: "Início das atividades",
        extensionistaId: ext2!.id,
        projetoId: projeto2.id
      },
      {
        dataHora: new Date(),
        tipo: "ENTRADA",
        observacao: "Chegando para atividade especial",
        extensionistaId: ext3!.id,
        projetoId: projeto2.id
      }
    ]
  });

  console.log("✅ Banco preenchido com sucesso!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Erro ao executar seed:", err);
    process.exit(1);
  });