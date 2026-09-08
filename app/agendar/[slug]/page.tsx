// app/agendar/[slug]/page.tsx
import ClienteAgendamento from "./ClienteAgendamento";

// ========================================
// DADOS MOCKADOS (FUTURO: Buscar do Prisma)
// ========================================

// TODO: Substituir por: await prisma.estabelecimento.findUnique({ where: { slug } })
const ESTABELECIMENTO_MOCK = {
  id: "est_001",
  slug: "teste",
  name: "teste",
  logoUrl: null, // ou "/logo.png"
  banner: null, // ou "/banner.jpg"
   primaryColor: "var(--estabelecimento-primary, #1a1a2e)",
  secondaryColor: "var(--estabelecimento-secondary, #e94560)",
  servicos: [
    {
      id: "serv_001",
      nome: "Corte",
      descricao: "Corte masculino tradicional",
      preco: 40.00,
      duracao: 30,
    },
    {
      id: "serv_002",
      nome: "Barba",
      descricao: "Barba completa com toalha quente",
      preco: 30.00,
      duracao: 20,
    },
    {
      id: "serv_003",
      nome: "Corte + Barba",
      descricao: "Combo corte e barba",
      preco: 60.00,
      duracao: 50,
    },
    {
      id: "serv_004",
      nome: "Pezinho",
      descricao: "Acabamento no pescoço e orelhas",
      preco: 15.00,
      duracao: 15,
    },
    {
      id: "serv_005",
      nome: "Platinado",
      descricao: "Descoloração e tonalização",
      preco: 120.00,
      duracao: 90,
    },
  ],
  profissionais: [
    { id: "prof_001", nome: "João Silva" },
    { id: "prof_002", nome: "Pedro Santos" },
    { id: "prof_003", nome: "Carlos Oliveira" },
  ],
  // Agendamentos existentes (para calcular disponibilidade)
  agendamentos: [
    {
      dataHora: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      profissionalId: "prof_001",
    },
    {
      dataHora: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
      profissionalId: "prof_001",
    },
    {
      dataHora: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      profissionalId: "prof_002",
    },
    {
      dataHora: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(),
      profissionalId: "prof_003",
    },
  ],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // ========================================
  // FUTURO: Buscar dados do Prisma
  // ========================================
  // const estabelecimento = await prisma.estabelecimento.findUnique({
  //   where: { slug },
  //   include: {
  //     servicos: { orderBy: { nome: "asc" } },
  //     profissionais: { orderBy: { nome: "asc" } },
  //     agendadamentos: {
  //       where: { dataHora: { gte: new Date() } },
  //       select: { dataHora: true, profissionalId: true },
  //     },
  //   },
  // });
  //
  // if (!estabelecimento) notFound();
  //
  // const estabelecimentoJson = {
  //   ...estabelecimento,
  //   servicos: estabelecimento.servicos.map((s) => ({
  //     ...s,
  //     preco: Number(s.preco),
  //   })),
  //   agendadamentos: estabelecimento.agendadamentos.map((a) => ({
  //     ...a,
  //     dataHora: a.dataHora.toISOString(),
  //   })),
  // };

  // Por enquanto, usa dados mockados
  const estabelecimento = ESTABELECIMENTO_MOCK;

  return <ClienteAgendamento estabelecimento={estabelecimento} slug={slug} />;
}