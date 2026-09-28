import type { Locale } from '../i18n/locales';
import type { ImageAsset, Localized } from './types';
import { TEMP } from './placeholder';

// Dedicated Home hero assets, in the approved slide order.
import heroSlide1 from '../assets/home/hero(1).jpeg';
import heroSlide2 from '../assets/home/hero(2).jpeg';
import heroSlide3 from '../assets/home/hero(3).png';
import heroSlide4 from '../assets/home/hero(4).jpg';
import servicesImage from '../assets/projects/casa-olivia/05.jpg';
// Client-supplied previews for the Projects index "Coming soon" frames.
import comingSoon01 from '../assets/projects-index/coming-soon-01.png';
import comingSoon02 from '../assets/projects-index/coming-soon-02.png';

/** Page-level copy. Non-Home pages remain TEMP until their content phase. */

interface PageMeta {
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
        projectId: 'maison-elan',
        image: { src: heroSlide1, alt: null },
        ratio: '16:9',
        kicker: null,
        description: HERO_COPY.maisonElan,
        textTone: 'light',
        mobilePosition: '42% 50%',
      },
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
  meta: { description: { en: TEMP.metaDescription } } satisfies PageMeta,
  /** Real portrait arrives separately; `null` renders the reserved frame. */
  portrait: null as ImageAsset | null,
  name: 'Batur Berrak',
  lead: { en: TEMP.statement } as Localized,
  profile: { en: [TEMP.paragraph, TEMP.paragraphAlt] } as Localized<string[]>,
  studio: { en: [TEMP.paragraphThird] } as Localized<string[]>,
};

export const SERVICES = {
  meta: { description: { en: TEMP.metaDescription } } satisfies PageMeta,
  lead: { en: TEMP.statement } as Localized,
  image: { image: { src: servicesImage, alt: null } satisfies ImageAsset, projectId: 'casa-olivia' },
  /** Service categories are not defined yet — neutral placeholders only. */
  areas: [
    { title: { en: TEMP.title } as Localized, text: { en: TEMP.short } as Localized },
    { title: { en: TEMP.titleAlt } as Localized, text: { en: TEMP.short } as Localized },
    { title: { en: TEMP.titleThird } as Localized, text: { en: TEMP.short } as Localized },
    { title: { en: TEMP.titleFourth } as Localized, text: { en: TEMP.short } as Localized },
  ],
  approach: [
    { title: { en: TEMP.title } as Localized, text: { en: TEMP.short } as Localized },
    { title: { en: TEMP.titleAlt } as Localized, text: { en: TEMP.short } as Localized },
    { title: { en: TEMP.titleThird } as Localized, text: { en: TEMP.short } as Localized },
  ],
  inquiryIntro: { en: TEMP.short } as Localized,
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
