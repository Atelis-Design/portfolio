import type { ImageMetadata } from 'astro';
import type { ImageAsset, ProjectRecord } from './types';

import casa01 from '../assets/projects/casa-olivia/01.jpg';
import casa02 from '../assets/projects/casa-olivia/02.jpg';
import casa03 from '../assets/projects/casa-olivia/03.jpg';
import casa04 from '../assets/projects/casa-olivia/04.jpg';
import casa05 from '../assets/projects/casa-olivia/05.jpg';
import casa06 from '../assets/projects/casa-olivia/06.jpg';
import casa07 from '../assets/projects/casa-olivia/07.jpg';
import casa08 from '../assets/projects/casa-olivia/08.jpg';
import casa09 from '../assets/projects/casa-olivia/09.jpg';
import casa10 from '../assets/projects/casa-olivia/10.jpg';

import linc01 from '../assets/projects/l-inconnue/01.jpg';
import linc02 from '../assets/projects/l-inconnue/02.jpg';
import linc03 from '../assets/projects/l-inconnue/03.jpg';
import linc04 from '../assets/projects/l-inconnue/04.jpg';
import linc05 from '../assets/projects/l-inconnue/05.jpg';
import linc06 from '../assets/projects/l-inconnue/06.jpg';
import linc07 from '../assets/projects/l-inconnue/07.jpg';
import linc08 from '../assets/projects/l-inconnue/08.jpg';
import linc09 from '../assets/projects/l-inconnue/09.jpg';

import elan01 from '../assets/projects/maison-elan/01.jpg';
import elan02 from '../assets/projects/maison-elan/02.jpg';
import elan03 from '../assets/projects/maison-elan/03.jpg';
import elan04 from '../assets/projects/maison-elan/04.jpg';
import elan05 from '../assets/projects/maison-elan/05.jpg';
import elan06 from '../assets/projects/maison-elan/06.jpg';
import elan07 from '../assets/projects/maison-elan/07.jpg';
import elan08 from '../assets/projects/maison-elan/08.jpg';
import elan09 from '../assets/projects/maison-elan/09.jpg';
import elan10 from '../assets/projects/maison-elan/10.jpg';

import walden01 from '../assets/projects/walden/01.jpg';
import walden02 from '../assets/projects/walden/02.jpg';
import walden03 from '../assets/projects/walden/03.jpg';
import walden04 from '../assets/projects/walden/04.jpg';
import walden05 from '../assets/projects/walden/05.jpg';
import walden06 from '../assets/projects/walden/06.jpg';
import walden07 from '../assets/projects/walden/07.jpg';
import walden08 from '../assets/projects/walden/08.jpg';
import walden09 from '../assets/projects/walden/09.jpg';
import walden10 from '../assets/projects/walden/10.jpg';
import walden11 from '../assets/projects/walden/11.jpg';
import walden12 from '../assets/projects/walden/12.jpg';

/** Image without written alt text yet (a neutral generated alt is used). */
const img = (src: ImageMetadata): ImageAsset => ({ src, alt: null });

/**
 * LOCAL PROJECT DATA — temporary source until Sanity.
 *
 * Titles come from the client's asset folders; category, concept and listing
 * order are client-approved. Project facts and text are NOT supplied yet:
 * `description`, `location`, `year`, `area` and `scope` stay null until Batur
 * provides them (a null field is simply not shown). Never fill them with guesses.
 *
 * Until `description` is supplied, the detail page shows the project's
 * client-approved Home carousel text (src/data/pages.ts, HOME.hero.slides).
 *
 * Images: `heroImage` opens the detail page, `gallery` follows in viewing order.
 */
export const PROJECTS: ProjectRecord[] = [
  {
    id: 'casa-olivia',
    title: 'Casa Olivia',
    portfolioCategory: 'residential',
    concept: 'Organic Contemporary / Mediterranean Living',
    listingOrder: 1,
    projectType: null,
    // TODO(Batur): project text and facts.
    description: null,
    location: null,
    year: null,
    area: null,
    scope: null,
    heroImage: img(casa01),
    coverImage: img(casa07),
    gallery: [casa02, casa04, casa05, casa03, casa06, casa08, casa09, casa10, casa07].map(img),
    credits: [],
    featured: true,
    homepageOrder: 4,
    seo: null,
  },
  {
    id: 'l-inconnue',
    title: 'L Inconnue',
    portfolioCategory: 'residential',
    concept: 'Modern Classic / Editorial Interior',
    listingOrder: 4,
    projectType: null,
    // TODO(Batur): project text and facts.
    description: null,
    location: null,
    year: null,
    area: null,
    scope: null,
    heroImage: img(linc01),
    coverImage: img(linc06),
    gallery: [linc02, linc05, linc06, linc07, linc03, linc08, linc09, linc04].map(img),
    credits: [],
    featured: true,
    homepageOrder: 2,
    seo: null,
  },
  {
    id: 'maison-elan',
    title: 'Maison Elan',
    portfolioCategory: 'residential',
    concept: 'Contemporary Classic / Sculptural Elegance',
    listingOrder: 2,
    projectType: null,
    // TODO(Batur): project text and facts.
    description: null,
    location: null,
    year: null,
    area: null,
    scope: null,
    heroImage: img(elan01),
    coverImage: img(elan02),
    gallery: [elan02, elan07, elan06, elan04, elan08, elan09, elan03, elan10, elan05].map(img),
    credits: [],
    featured: true,
    homepageOrder: 1,
    seo: null,
  },
  {
    id: 'walden',
    title: 'Walden',
    portfolioCategory: 'residential',
    concept: 'Contemporary Alpine / Quiet Luxury',
    listingOrder: 3,
    projectType: null,
    // TODO(Batur): project text and facts.
    description: null,
    location: null,
    year: null,
    area: null,
    scope: null,
    heroImage: img(walden01),
    coverImage: img(walden05),
    gallery: [walden02, walden04, walden05, walden06, walden03, walden08, walden07, walden09, walden10, walden11, walden12].map(img),
    credits: [],
    featured: true,
    homepageOrder: 3,
    seo: null,
  },
];
