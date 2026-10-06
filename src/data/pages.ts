import type { Locale } from '../i18n/locales';
import type { ImageAsset, Localized } from './types';
import { TEMP } from './placeholder';

// Dedicated Home hero assets. File numbers are not the slide order: that is HOME.hero.slides below.
import heroSlide1 from '../assets/home/hero(1).jpeg';
import heroSlide2 from '../assets/home/hero(2).jpeg';
import heroSlide3 from '../assets/home/hero(3).png';
import heroSlide4 from '../assets/home/hero(4).jpg';
// Client-supplied previews for the Projects index "Coming soon" frames.
import comingSoon01 from '../assets/projects-index/coming-soon-01.png';
import comingSoon02 from '../assets/projects-index/coming-soon-02.png';
// Client-supplied Services imagery: the hero and one image per service, in service order.
import servicesHero from '../assets/services/services-hero.png';
import serviceConcept from '../assets/services/concept-design.png';
import serviceInterior from '../assets/services/interior-architecture.png';
import serviceTechnical from '../assets/services/technical-drawing.png';
import serviceMaterials from '../assets/services/materials-furniture.png';
import serviceStyling from '../assets/services/consulting-styling.png';

/** Page-level copy. Non-Home pages remain TEMP until their content phase. */

interface PageMeta {
  title?: Localized;
  description: Localized;
}

/** Text/control colour over a slide on desktop: "light" on darker imagery, "dark" on lighter imagery. */
export type TextTone = 'light' | 'dark';

/** Desktop presentation ratio of the prepared Home assets. */
export type HeroRatio = '16:9';

/**
 * One hero slide = one project. The title is the project's real name
 * (resolved from projectId). Layout is shared by all slides; only the
 * image, title, description and (desktop) tone change between slides.
 */
export interface HeroSlide {
  projectId: string;
  image: ImageAsset;
  /** Desktop presentation ratio. */
  ratio: HeroRatio;
  /** Small label above the title. null → the localized structural label. */
  kicker: Localized | null;
  /** Client-approved short project description in every supported locale. */
  description: Localized | null;
  /** Desktop tone of the overlaid slide text (mobile text sits on the warm surface). */
  textTone: TextTone;
  /** Focal point for the controlled mobile crop. Desktop images stay centered. */
  mobilePosition: string;
}

/**
 * CLIENT-APPROVED hero copy (supplied by the client). Do not machine-translate;
 * add further locales here only when approved copy is supplied.
 */
const HERO_COPY = {
  maisonElan: {
    tr: 'Klasik detayların modern formlarla yeniden yorumlandığı, karakterli ve rafine bir iç mekân.',
    de: 'Ein Interieur mit Charakter und Raffinesse, in dem klassische Details durch moderne Formen neu interpretiert werden.',
    en: 'An interior with character and refinement, where classic details are reinterpreted through modern forms.',
    fr: 'Un intérieur de caractère et raffiné, où les détails classiques sont réinterprétés à travers des formes contemporaines.',
    es: 'Un interior con carácter y refinamiento, donde los detalles clásicos se reinterpretan mediante formas contemporáneas.',
    it: 'Un interno dal carattere deciso e raffinato, in cui i dettagli classici vengono reinterpretati attraverso forme contemporanee.',
    ru: 'Интерьер с характером и утончённостью, где классические детали переосмыслены через современные формы.',
  },
  lInconnue: {
    tr: 'Gizemli bir kadın figüründen ilham alan bu proje, güçlü duruşu, zarafeti ve sanatsal ifadesiyle öne çıkan özgün bir yaşam alanı sunuyor.',
    de: 'Inspiriert von der geheimnisvollen Figur einer Frau entsteht ein unverwechselbarer Wohnraum, der durch eine starke Haltung, Eleganz und künstlerischen Ausdruck geprägt ist.',
    en: 'Inspired by the mysterious figure of a woman, this project creates a distinctive living space defined by a strong presence, elegance and artistic expression.',
    fr: 'Inspiré par la figure mystérieuse d’une femme, ce projet crée un espace de vie singulier, marqué par une présence affirmée, l’élégance et une expression artistique.',
    es: 'Inspirado en la enigmática figura de una mujer, este proyecto crea un espacio de vida singular, definido por una presencia firme, la elegancia y la expresión artística.',
    it: 'Ispirato alla figura misteriosa di una donna, questo progetto dà vita a uno spazio abitativo distintivo, definito da una forte presenza, eleganza ed espressione artistica.',
    ru: 'Этот проект, вдохновлённый загадочным женским образом, создаёт самобытное жилое пространство с сильным характером, элегантностью и художественной выразительностью.',
  },
  walden: {
    tr: 'Doğanın dinginliğini çağdaş yaşamın zarafetiyle buluşturan, zamansız bir yaşam alanı.',
    de: 'Ein zeitloser Wohnraum, der die Ruhe der Natur mit der Eleganz zeitgenössischen Lebens verbindet.',
    en: 'A timeless living space that brings together the calm of nature and the elegance of contemporary living.',
    fr: 'Un espace de vie intemporel qui unit la sérénité de la nature à l’élégance de la vie contemporaine.',
    es: 'Un espacio de vida atemporal que une la serenidad de la naturaleza con la elegancia de la vida contemporánea.',
    it: 'Uno spazio abitativo senza tempo che unisce la quiete della natura all’eleganza della vita contemporanea.',
    ru: 'Вневременное жилое пространство, объединяющее спокойствие природы с элегантностью современной жизни.',
  },
  casaOlivia: {
    tr: 'Doğal tonların, yumuşak formların ve sıcak ışığın bir araya geldiği davetkâr ve zamansız bir iç mekân.',
    de: 'Ein einladendes und zeitloses Interieur, in dem natürliche Töne, weiche Formen und warmes Licht zusammenfinden.',
    en: 'An inviting, timeless interior where natural tones, soft forms and warm light come together.',
    fr: 'Un intérieur accueillant et intemporel où se rencontrent des tons naturels, des formes douces et une lumière chaleureuse.',
    es: 'Un interior acogedor y atemporal donde se combinan tonos naturales, formas suaves y una luz cálida.',
    it: 'Un interno accogliente e senza tempo, in cui tonalità naturali, forme morbide e luce calda si incontrano.',
    ru: 'Уютный и вневременной интерьер, в котором сочетаются природные оттенки, мягкие формы и тёплый свет.',
  },
} satisfies Record<string, Localized>;

export const HOME = {
  meta: {
    title: {
      tr: 'İç Mimarlık',
      de: 'Innenarchitektur',
      en: 'Interior Architecture',
      fr: 'Architecture intérieure',
      es: 'Arquitectura de interiores',
      it: 'Architettura d’interni',
      ru: 'Архитектура интерьера',
    },
    description: {
      tr: 'Atelis Design — İç Mimarlık.',
      de: 'Atelis Design — Innenarchitektur.',
      en: 'Atelis Design — Interior Architecture.',
      fr: 'Atelis Design — Architecture intérieure.',
      es: 'Atelis Design — Arquitectura de interiores.',
      it: 'Atelis Design — Architettura d’interni.',
      ru: 'Atelis Design — Архитектура интерьера.',
    },
  } satisfies PageMeta,
  hero: {
    slides: [
      {
        projectId: 'l-inconnue',
        image: { src: heroSlide2, alt: null },
        ratio: '16:9',
        kicker: null,
        description: HERO_COPY.lInconnue,
        textTone: 'dark',
        mobilePosition: '55% 50%',
      },
      {
        projectId: 'maison-elan',
        image: { src: heroSlide1, alt: null },
        ratio: '16:9',
        kicker: null,
        description: HERO_COPY.maisonElan,
        textTone: 'light',
        mobilePosition: '42% 50%',
      },
      {
        projectId: 'walden',
        image: { src: heroSlide3, alt: null },
        ratio: '16:9',
        kicker: null,
        description: HERO_COPY.walden,
        textTone: 'light',
        mobilePosition: '48% 50%',
      },
      {
        projectId: 'casa-olivia',
        image: { src: heroSlide4, alt: null },
        ratio: '16:9',
        kicker: null,
        description: HERO_COPY.casaOlivia,
        textTone: 'light',
        mobilePosition: '48% 50%',
      },
    ] satisfies HeroSlide[],
  },
};

/**
 * Projects index hero, complete in every locale (no fallback). The Turkish copy is
 * client-approved; the eyebrow is the localized navigation label (ui.nav.projects).
 * `title` is split into its display lines.
 */
const PROJECTS_LEAD = {
  tr: 'Her proje, bir mekânın, insanın ve amacın yansımasıdır. Zamansız, düşünülmüş ve yaşayan mekânlar tasarlıyoruz.',
  en: 'Every project reflects a place, a person and a purpose. We design spaces that are timeless, considered and alive.',
  de: 'Jedes Projekt spiegelt einen Ort, einen Menschen und eine Absicht wider. Wir gestalten zeitlose, durchdachte und lebendige Räume.',
  fr: 'Chaque projet est le reflet d’un lieu, d’une personne et d’une intention. Nous concevons des espaces intemporels, réfléchis et vivants.',
  es: 'Cada proyecto es el reflejo de un lugar, de una persona y de un propósito. Diseñamos espacios atemporales, cuidadosamente pensados y llenos de vida.',
  it: 'Ogni progetto è il riflesso di un luogo, di una persona e di uno scopo. Progettiamo spazi senza tempo, meditati e pieni di vita.',
  ru: 'Каждый проект — отражение пространства, человека и его замысла. Мы создаём вневременные, продуманные и живые пространства.',
} satisfies Record<Locale, string>;

export const PROJECTS_PAGE = {
  meta: { description: PROJECTS_LEAD } satisfies PageMeta,
  title: {
    tr: ['Ruhunu', 'Yansıtan Mekanlar'],
    en: ['Spaces with', 'a Soul of Their Own'],
    de: ['Räume', 'mit Seele'],
    fr: ['Des espaces', 'qui ont une âme'],
    es: ['Espacios', 'con alma'],
    it: ['Spazi', 'con un’anima'],
    ru: ['Пространства', 'с душой'],
  } satisfies Record<Locale, [string, string]>,
  lead: PROJECTS_LEAD,
  /**
   * "Coming soon" previews at 1-based positions in the unfiltered grid.
   * Layout only: not projects — no number, title, route or link, never counted.
   * Revisit when a project is added.
   */
  comingSoon: [
    { position: 3, image: { src: comingSoon01, alt: null } },
    { position: 6, image: { src: comingSoon02, alt: null } },
  ] satisfies { position: number; image: ImageAsset }[],
};

export const ABOUT = {
  meta: {
    description: {
      tr: 'Atelis Design ve iç mimarlık portfolyosunun arkasındaki stüdyo hakkında.',
      de: 'Über Atelis Design und das Studio hinter dem Innenarchitektur-Portfolio.',
      en: 'About Atelis Design and the studio behind its interior architecture portfolio.',
      fr: 'À propos d’Atelis Design et du studio à l’origine de son portfolio d’architecture intérieure.',
      es: 'Acerca de Atelis Design y del estudio detrás de su portfolio de arquitectura de interiores.',
      it: 'Atelis Design e lo studio dietro il suo portfolio di architettura d’interni.',
      ru: 'Об Atelis Design и студии, создавшей портфолио интерьерной архитектуры.',
    },
  } satisfies PageMeta,
  /** Real portrait arrives separately; `null` renders the reserved frame. */
  portrait: null as ImageAsset | null,
  name: 'Batur Berrak',
  lead: { en: TEMP.statement } as Localized,
  profile: { en: [TEMP.paragraph, TEMP.paragraphAlt] } as Localized<string[]>,
  studio: { en: [TEMP.paragraphThird] } as Localized<string[]>,
};

/** A Services entry (service or process stage), complete in every locale. */
type Complete<T = string> = Record<Locale, T>;

interface ServiceItem {
  title: Complete;
  text: Complete;
  image: ImageAsset;
}

interface ProcessStage {
  title: Complete;
  text: Complete;
}

/**
 * Services copy, complete in every locale (no fallback). The Turkish copy is
 * client-approved; German is the primary public version and the other locales
 * are localized from the same meaning. The hero heading is the localized
 * navigation label (ui.nav.services). Titles are stored in natural case; the
 * page sets them in capitals with CSS (lang-aware, so Turkish i → İ).
 */
export const SERVICES = {
  meta: {
    title: {
      tr: 'Hizmetler: İç Mimarlık & Konsept Tasarım',
      de: 'Leistungen: Innenarchitektur & Raumkonzepte',
      en: 'Services: Interior Architecture & Concept Design',
      fr: 'Services : architecture intérieure & concept',
      es: 'Servicios: interiorismo & diseño conceptual',
      it: 'Servizi: architettura d’interni & concept design',
      ru: 'Услуги: дизайн интерьера и концепция',
    } satisfies Complete,
    description: {
      tr: 'Atelis Design hizmetleri: konsept tasarım, iç mimari proje, teknik çizim ve detaylandırma, malzeme ve mobilya seçimi, danışmanlık ve stiling.',
      de: 'Leistungen von Atelis Design: Konzeptentwicklung, Innenarchitektur, technische Zeichnung und Detailplanung, Material- und Möbelauswahl, Beratung und Styling.',
      en: 'Atelis Design services: concept design, interior architecture, technical drawing and detailing, material and furniture selection, consulting and styling.',
      fr: 'Les services d’Atelis Design : création du concept, architecture intérieure, plans techniques et détails, choix des matériaux et du mobilier, conseil et stylisme.',
      es: 'Servicios de Atelis Design: diseño conceptual, proyecto de interiorismo, planos técnicos y detalles, selección de materiales y mobiliario, asesoramiento y estilismo.',
      it: 'I servizi di Atelis Design: concept design, progetto d’interni, disegni tecnici e dettagli, selezione di materiali e arredi, consulenza e styling.',
      ru: 'Услуги Atelis Design: концепция дизайна, дизайн-проект интерьера, технические чертежи и детализация, подбор материалов и мебели, консультации и стайлинг.',
    } satisfies Complete,
  },
  lead: {
    tr: 'Mekânın potansiyelini, yaşam biçimi ve estetikle buluşturan bütüncül bir tasarım yaklaşımı sunuyoruz. Her proje için ihtiyaca özel, yaratıcı ve işlevsel çözümler geliştiriyoruz.',
    de: 'Wir verfolgen einen ganzheitlichen Gestaltungsansatz, der das Potenzial eines Raumes mit Lebensstil und Ästhetik verbindet. Für jedes Projekt entwickeln wir individuelle, kreative und funktionale Lösungen.',
    en: 'We offer a holistic design approach that brings the potential of a space together with lifestyle and aesthetics. For every project, we develop tailored, creative and functional solutions.',
    fr: 'Nous proposons une approche globale du design, qui réunit le potentiel d’un lieu, l’art de vivre et l’esthétique. Pour chaque projet, nous concevons des solutions sur mesure, créatives et fonctionnelles.',
    es: 'Ofrecemos un enfoque de diseño integral que une el potencial del espacio con el estilo de vida y la estética. Para cada proyecto desarrollamos soluciones a medida, creativas y funcionales.',
    it: 'Proponiamo un approccio progettuale integrato, che unisce il potenziale dello spazio allo stile di vita e all’estetica. Per ogni progetto sviluppiamo soluzioni su misura, creative e funzionali.',
    ru: 'Мы предлагаем целостный подход к дизайну, объединяющий потенциал пространства с образом жизни и эстетикой. Для каждого проекта мы разрабатываем индивидуальные, креативные и функциональные решения.',
  } satisfies Complete,
  hero: {
    src: servicesHero,
    alt: {
      tr: 'Mermer orta sehpa, koyu vazo ve dallarla gün ışığı alan sıcak tonlu bir oturma alanı',
      de: 'Sonnendurchfluteter Wohnraum in warmen Tönen mit Marmor-Couchtisch, dunkler Vase und Zweigen',
      en: 'Sunlit living space in warm tones with a marble coffee table, a dark vase and branches',
      fr: 'Séjour baigné de soleil aux tons chauds, avec table basse en marbre, vase sombre et branchages',
      es: 'Salón soleado de tonos cálidos con mesa de centro de mármol, jarrón oscuro y ramas',
      it: 'Soggiorno soleggiato dai toni caldi con tavolino in marmo, vaso scuro e rami',
      ru: 'Залитая солнцем гостиная в тёплых тонах с мраморным столиком, тёмной вазой и ветвями',
    } satisfies Complete,
  } satisfies ImageAsset,
  /** The five services, in the approved order. */
  items: [
    {
      title: {
        tr: 'Konsept Tasarım',
        de: 'Konzeptentwicklung',
        en: 'Concept Design',
        fr: 'Création du concept',
        es: 'Diseño conceptual',
        it: 'Concept design',
        ru: 'Концепция дизайна',
      },
      text: {
        tr: 'Mekânın kimliğini belirleyen fikir ve tasarım dili oluşturuyoruz.',
        de: 'Wir entwickeln die Idee und die Gestaltungssprache, die die Identität eines Raumes prägen.',
        en: 'We shape the idea and the design language that define the identity of a space.',
        fr: 'Nous définissons l’idée et le langage esthétique qui donnent son identité à un lieu.',
        es: 'Creamos la idea y el lenguaje de diseño que definen la identidad del espacio.',
        it: 'Definiamo l’idea e il linguaggio progettuale che danno identità allo spazio.',
        ru: 'Создаём идею и язык дизайна, которые определяют характер пространства.',
      },
      image: {
        src: serviceConcept,
        alt: {
          tr: 'Traverten kemer, taş küre ve malzeme plakalarından oluşan heykelsi kompozisyon',
          de: 'Skulpturale Komposition aus Travertinbogen, Steinkugel und Materialplatten',
          en: 'Sculptural composition of a travertine arch, a stone sphere and material slabs',
          fr: 'Composition sculpturale : arche en travertin, sphère de pierre et plaques de matériaux',
          es: 'Composición escultórica con arco de travertino, esfera de piedra y placas de materiales',
          it: 'Composizione scultorea con arco in travertino, sfera di pietra e lastre di materiali',
          ru: 'Скульптурная композиция из травертиновой арки, каменной сферы и образцов материалов',
        },
      },
    },
    {
      title: {
        tr: 'İç Mimari Proje',
        de: 'Innenarchitektur',
        en: 'Interior Architecture',
        fr: 'Architecture intérieure',
        es: 'Proyecto de interiorismo',
        it: 'Progetto d’interni',
        ru: 'Дизайн-проект интерьера',
      },
      text: {
        tr: 'Estetik ve işlevselliği bütünleştiren detaylı iç mimari çözümler sunuyoruz.',
        de: 'Wir planen detaillierte innenarchitektonische Lösungen, die Ästhetik und Funktion vereinen.',
        en: 'We deliver detailed interior architecture solutions that unite aesthetics and function.',
        fr: 'Nous proposons des solutions d’architecture intérieure détaillées, alliant esthétique et fonctionnalité.',
        es: 'Ofrecemos soluciones de interiorismo detalladas que integran estética y funcionalidad.',
        it: 'Offriamo soluzioni dettagliate di architettura d’interni che uniscono estetica e funzionalità.',
        ru: 'Предлагаем детально проработанные интерьерные решения, объединяющие эстетику и функциональность.',
      },
      image: {
        src: serviceInterior,
        alt: {
          tr: 'Organik formlu açık renk koltuk ve taş sehpalarla doğal tonlarda bir salon',
          de: 'Wohnzimmer in Naturtönen mit organisch geformtem, hellem Sofa und Steintischen',
          en: 'Living room in natural tones with an organically shaped pale sofa and stone tables',
          fr: 'Salon aux tons naturels avec canapé clair aux formes organiques et tables en pierre',
          es: 'Salón en tonos naturales con sofá claro de formas orgánicas y mesas de piedra',
          it: 'Soggiorno dai toni naturali con divano chiaro dalle forme organiche e tavolini in pietra',
          ru: 'Гостиная в природных тонах со светлым диваном органичной формы и каменными столиками',
        },
      },
    },
    {
      title: {
        tr: 'Teknik Çizim & Detaylandırma',
        de: 'Technische Zeichnung & Detailplanung',
        en: 'Technical Drawing & Detailing',
        fr: 'Plans techniques & détails',
        es: 'Planos técnicos & detalles',
        it: 'Disegni tecnici & dettagli',
        ru: 'Технические чертежи и детализация',
      },
      text: {
        tr: 'Tasarıma ait plan, görünüş ve teknik detayları titizlikle hazırlıyoruz.',
        de: 'Wir erarbeiten Grundrisse, Ansichten und technische Details des Entwurfs mit größter Sorgfalt.',
        en: 'We prepare the plans, elevations and technical details of the design with meticulous care.',
        fr: 'Nous établissons avec soin les plans, les élévations et les détails techniques du projet.',
        es: 'Elaboramos con rigor los planos, alzados y detalles técnicos del diseño.',
        it: 'Elaboriamo con cura piante, prospetti e dettagli tecnici del progetto.',
        ru: 'Тщательно готовим планы, развёртки и технические детали проекта.',
      },
      image: {
        src: serviceTechnical,
        alt: {
          tr: 'Mimari planlar ve teknik çizimler üzerinde iki kalem',
          de: 'Architekturpläne und technische Zeichnungen mit zwei Stiften',
          en: 'Architectural plans and technical drawings with two pens',
          fr: 'Plans d’architecture et dessins techniques avec deux stylos',
          es: 'Planos de arquitectura y dibujos técnicos con dos plumas',
          it: 'Piante architettoniche e disegni tecnici con due penne',
          ru: 'Архитектурные планы и технические чертежи с двумя ручками',
        },
      },
    },
    {
      title: {
        tr: 'Malzeme & Mobilya Seçimi',
        de: 'Material- & Möbelauswahl',
        en: 'Material & Furniture Selection',
        fr: 'Choix des matériaux & du mobilier',
        es: 'Selección de materiales & mobiliario',
        it: 'Selezione di materiali & arredi',
        ru: 'Подбор материалов и мебели',
      },
      text: {
        tr: 'Projeye uygun malzeme, mobilya ve dekorasyon seçimlerini yapıyoruz.',
        de: 'Wir wählen Materialien, Möbel und Dekoration aus, die zum Projekt passen.',
        en: 'We select the materials, furniture and décor that suit the project.',
        fr: 'Nous sélectionnons les matériaux, le mobilier et la décoration adaptés au projet.',
        es: 'Seleccionamos los materiales, el mobiliario y la decoración adecuados para el proyecto.',
        it: 'Selezioniamo i materiali, gli arredi e le decorazioni più adatti al progetto.',
        ru: 'Подбираем материалы, мебель и декор, подходящие проекту.',
      },
      image: {
        src: serviceMaterials,
        alt: {
          tr: 'Taş, ahşap ve kumaş örneklerinden oluşan malzeme paleti',
          de: 'Materialpalette mit Mustern aus Stein, Holz und Textil',
          en: 'Material palette with stone, wood and textile samples',
          fr: 'Palette de matériaux avec échantillons de pierre, de bois et de textile',
          es: 'Paleta de materiales con muestras de piedra, madera y tejido',
          it: 'Palette di materiali con campioni di pietra, legno e tessuto',
          ru: 'Палитра материалов с образцами камня, дерева и текстиля',
        },
      },
    },
    {
      title: {
        tr: 'Danışmanlık & Stiling',
        de: 'Beratung & Styling',
        en: 'Consulting & Styling',
        fr: 'Conseil & stylisme',
        es: 'Asesoramiento & estilismo',
        it: 'Consulenza & styling',
        ru: 'Консультации и стайлинг',
      },
      text: {
        tr: 'Tasarım danışmanlığı, stil önerileri, final dokunuşları ve mobilya/dekor düzenlemeleriyle bütüncül bir atmosfer oluşturuyoruz.',
        de: 'Gestaltungsberatung, Stilempfehlungen, letzte Akzente und das Arrangement von Möbeln und Dekor – für eine stimmige Gesamtatmosphäre.',
        en: 'Through design consulting, style recommendations, finishing touches and the arrangement of furniture and décor, we create a cohesive atmosphere.',
        fr: 'Conseil en design, recommandations de style, touches finales et agencement du mobilier et du décor : nous créons une atmosphère cohérente.',
        es: 'Con asesoramiento de diseño, propuestas de estilo, toques finales y la disposición del mobiliario y la decoración, creamos una atmósfera armoniosa.',
        it: 'Con consulenza progettuale, proposte di stile, tocchi finali e la disposizione di arredi e decorazioni creiamo un’atmosfera armoniosa.',
        ru: 'Консультации по дизайну, рекомендации по стилю, финальные штрихи и расстановка мебели и декора — так мы создаём целостную атмосферу.',
      },
      image: {
        src: serviceStyling,
        alt: {
          tr: 'Pirinç lamba, kitaplar, tablo ve koyu vazoyla düzenlenmiş mermer konsol',
          de: 'Gestaltete Marmorkonsole mit Messingleuchte, Büchern, Kunstwerk und dunkler Vase',
          en: 'Styled marble console with a brass lamp, books, artwork and a dark vase',
          fr: 'Console en marbre mise en scène avec lampe en laiton, livres, tableau et vase sombre',
          es: 'Consola de mármol decorada con lámpara de latón, libros, cuadro y jarrón oscuro',
          it: 'Consolle in marmo allestita con lampada in ottone, libri, quadro e vaso scuro',
          ru: 'Мраморная консоль с латунной лампой, книгами, картиной и тёмной вазой',
        },
      },
    },
  ] satisfies ServiceItem[],
  process: {
    kicker: {
      tr: 'Süreç',
      de: 'Prozess',
      en: 'Process',
      fr: 'Processus',
      es: 'Proceso',
      it: 'Processo',
      ru: 'Процесс',
    } satisfies Complete,
    heading: {
      tr: 'Fikirden Mekâna',
      de: 'Von der Idee zum Raum',
      en: 'From Idea to Space',
      fr: 'De l’idée à l’espace',
      es: 'De la idea al espacio',
      it: 'Dall’idea allo spazio',
      ru: 'От идеи к пространству',
    } satisfies Complete,
    /** Exactly four stages. */
    stages: [
      {
        title: {
          tr: 'Keşif',
          de: 'Analyse',
          en: 'Discovery',
          fr: 'Découverte',
          es: 'Descubrimiento',
          it: 'Scoperta',
          ru: 'Знакомство',
        },
        text: {
          tr: 'İhtiyaçları ve potansiyeli birlikte analiz ediyoruz.',
          de: 'Gemeinsam ermitteln wir Bedürfnisse und Potenzial.',
          en: 'Together, we analyse needs and potential.',
          fr: 'Nous analysons ensemble les besoins et le potentiel.',
          es: 'Analizamos juntos las necesidades y el potencial.',
          it: 'Analizziamo insieme esigenze e potenziale.',
          ru: 'Вместе анализируем потребности и потенциал.',
        },
      },
      {
        title: {
          tr: 'Tasarım',
          de: 'Entwurf',
          en: 'Design',
          fr: 'Conception',
          es: 'Diseño',
          it: 'Progetto',
          ru: 'Дизайн',
        },
        text: {
          tr: 'Kreatif ve işlevsel çözümler geliştiriyoruz.',
          de: 'Wir entwickeln kreative und funktionale Lösungen.',
          en: 'We develop creative and functional solutions.',
          fr: 'Nous développons des solutions créatives et fonctionnelles.',
          es: 'Desarrollamos soluciones creativas y funcionales.',
          it: 'Sviluppiamo soluzioni creative e funzionali.',
          ru: 'Разрабатываем креативные и функциональные решения.',
        },
      },
      {
        title: {
          tr: 'Geliştirme',
          de: 'Ausarbeitung',
          en: 'Development',
          fr: 'Développement',
          es: 'Desarrollo',
          it: 'Sviluppo',
          ru: 'Разработка',
        },
        text: {
          tr: 'Tasarımı teknik olarak detaylandırıyoruz.',
          de: 'Wir arbeiten den Entwurf technisch im Detail aus.',
          en: 'We detail the design technically.',
          fr: 'Nous détaillons le projet sur le plan technique.',
          es: 'Detallamos el diseño a nivel técnico.',
          it: 'Definiamo il progetto nei dettagli tecnici.',
          ru: 'Прорабатываем технические детали проекта.',
        },
      },
      {
        title: {
          tr: 'Sunum & Yönlendirme',
          de: 'Präsentation & Begleitung',
          en: 'Presentation & Guidance',
          fr: 'Présentation & accompagnement',
          es: 'Presentación & acompañamiento',
          it: 'Presentazione & supporto',
          ru: 'Презентация и сопровождение',
        },
        text: {
          tr: 'Final tasarım paketini sunuyor, karar verme sürecinde rehberlik ediyoruz.',
          de: 'Wir präsentieren das finale Designpaket und begleiten Sie bei der Entscheidungsfindung.',
          en: 'We present the final design package and guide you through the decision-making process.',
          fr: 'Nous présentons le dossier de conception final et vous accompagnons dans vos décisions.',
          es: 'Presentamos el paquete de diseño final y le acompañamos en la toma de decisiones.',
          it: 'Presentiamo il pacchetto progettuale finale e La accompagniamo nelle decisioni.',
          ru: 'Представляем финальный дизайн-пакет и помогаем принять решение.',
        },
      },
    ] satisfies ProcessStage[],
  },
};

/**
 * CLIENT-APPROVED Contact copy, complete in every locale (no fallback needed).
 * Stored in natural case; the page sets it in capitals with CSS (lang-aware, so
 * Turkish i → İ). The eyebrow is the localized navigation label (ui.nav.contact);
 * form strings live in src/i18n/ui.ts (contactForm).
 */
const CONTACT_PARAGRAPHS = {
  tr: [
    'Yeni projeler, iş birlikleri veya sorularınız için her zaman bizimle iletişime geçebilirsiniz.',
    'Mekanlara değer katan, zamansız ve yaşamla bütünleşen tasarım çözümleri üretmek için buradayız.',
  ],
  en: [
    'You can always get in touch with us for new projects, collaborations or any questions.',
    'We are here to create timeless design solutions that add value to spaces and become part of everyday life.',
  ],
  de: [
    'Für neue Projekte, Kooperationen oder Fragen können Sie sich jederzeit gerne an uns wenden.',
    'Wir entwickeln zeitlose Gestaltungslösungen, die Räumen Wert verleihen und sich selbstverständlich mit dem Leben verbinden.',
  ],
  fr: [
    'Pour un nouveau projet, une collaboration ou toute question, vous pouvez nous contacter à tout moment.',
    'Nous créons des solutions intemporelles qui donnent de la valeur aux espaces et s’intègrent naturellement à la vie quotidienne.',
  ],
  es: [
    'Puede ponerse en contacto con nosotros en cualquier momento para nuevos proyectos, colaboraciones o cualquier consulta.',
    'Creamos soluciones de diseño atemporales que aportan valor a los espacios y se integran de forma natural en la vida cotidiana.',
  ],
  it: [
    'Per nuovi progetti, collaborazioni o qualsiasi domanda, può contattarci in qualsiasi momento.',
    'Creiamo soluzioni di design senza tempo che valorizzano gli spazi e si integrano naturalmente nella vita quotidiana.',
  ],
  ru: [
    'Вы всегда можете связаться с нами по вопросам новых проектов, сотрудничества или получить дополнительную информацию.',
    'Мы создаём вневременные дизайнерские решения, которые придают пространству ценность и естественно становятся частью повседневной жизни.',
  ],
} satisfies Record<Locale, [string, string]>;

export const CONTACT = {
  /** The first paragraph doubles as the meta description. */
  meta: {
    description: Object.fromEntries(
      Object.entries(CONTACT_PARAGRAPHS).map(([locale, [first]]) => [locale, first]),
    ) as Record<Locale, string>,
  } satisfies PageMeta,
  headline: {
    tr: 'Birlikte tasarlayalım',
    en: 'Let’s design together',
    de: 'Lassen Sie uns gemeinsam gestalten',
    fr: 'Imaginons ensemble',
    es: 'Diseñemos juntos',
    it: 'Progettiamo insieme',
    ru: 'Создавайте вместе с нами',
  } satisfies Record<Locale, string>,
  paragraphs: CONTACT_PARAGRAPHS,
};
