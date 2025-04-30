import { InsertNews, ProjectCategory } from '@shared/schema';

export const mockNews: InsertNews[] = [
  {
    title: "Успешное завершение медицинского проекта в Кении",
    titleEn: "Successful completion of medical project in Kenya",
    content: "Наши волонтеры успешно завершили трехмесячный медицинский проект в отдаленных районах Кении, оказав помощь более чем 1000 пациентам.",
    contentEn: "Our volunteers successfully completed a three-month medical project in remote areas of Kenya, helping more than 1,000 patients.",
    date: new Date("2024-01-15"),
    category: ProjectCategory.MEDICAL,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Открытие нового образовательного центра в Непале",
    titleEn: "Opening of a new educational center in Nepal",
    content: "В горном районе Непале открылся новый образовательный центр, построенный при поддержке наших волонтеров и партнеров.",
    contentEn: "A new educational center has opened in the mountainous region of Nepal, built with the support of our volunteers and partners.",
    date: new Date("2024-01-10"),
    category: ProjectCategory.EDUCATION,
    image: "https://images.unsplash.com/photo-1597633244018-0797674bee51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Спортивный турнир в Бразилии",
    titleEn: "Sports tournament in Brazil",
    content: "Волонтеры организовали масштабный спортивный турнир для детей из малообеспеченных семей в Рио-де-Жанейро.",
    contentEn: "Volunteers organized a large-scale sports tournament for children from low-income families in Rio de Janeiro.",
    date: new Date("2024-01-05"),
    category: ProjectCategory.SPORTS,
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Экологическая акция в Коста-Рике",
    titleEn: "Environmental action in Costa Rica",
    content: "Команда волонтеров провела масштабную акцию по очистке пляжей и защите морских черепах в Коста-Рике.",
    contentEn: "A team of volunteers conducted a large-scale beach cleanup and sea turtle protection campaign in Costa Rica.",
    date: new Date("2024-01-01"),
    category: ProjectCategory.ENVIRONMENT,
    image: "https://images.unsplash.com/photo-1520551775756-d481df50f47f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Медицинская миссия в Индии",
    titleEn: "Medical mission in India",
    content: "Группа врачей-волонтеров провела серию бесплатных медицинских осмотров в сельских районах штата Тамил Наду.",
    contentEn: "A group of volunteer doctors conducted a series of free medical check-ups in rural areas of Tamil Nadu state.",
    date: new Date("2023-12-25"),
    category: ProjectCategory.MEDICAL,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];