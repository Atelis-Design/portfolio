import type { ImageAsset, Localized } from './types';
import { TEMP } from './placeholder';

// Dedicated Home hero assets, in the approved slide order.
import heroSlide1 from '../assets/home/hero(1).jpeg';
import heroSlide2 from '../assets/home/hero(2).jpeg';
import heroSlide3 from '../assets/home/hero(3).png';
import heroSlide4 from '../assets/home/hero(4).jpg';
import servicesImage from '../assets/projects/casa-olivia/05.jpg';
import contactImage from '../assets/projects/walden/03.jpg';

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

export const PROJECTS_PAGE = {
  meta: { description: { en: TEMP.metaDescription } } satisfies PageMeta,
  intro: { en: TEMP.short } as Localized,
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

export const CONTACT = {
  meta: { description: { en: TEMP.metaDescription } } satisfies PageMeta,
  image: { image: { src: contactImage, alt: null } satisfies ImageAsset, projectId: 'walden' },
  lead: { en: TEMP.headline } as Localized,
  body: { en: TEMP.short } as Localized,
};
