import type { ImageMetadata } from 'astro';
import type { ImageAsset, ProjectRecord } from './types';
import { TEMP } from './placeholder';

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
 * Titles come from the client's asset folders. Everything factual that is
 * unknown (type, location, year, area, credits) is deliberately null/empty.
 * Descriptions and story text are TEMP placeholder copy.
 */
export const PROJECTS: ProjectRecord[] = [
  {
    id: 'casa-olivia',
    title: 'Casa Olivia',
    projectType: null,
    location: null,
    year: null,
    area: null,
    shortDescription: { en: TEMP.short },
    projectStory: { en: [TEMP.paragraph, TEMP.paragraphAlt] },
    heroImage: img(casa01),
    coverImage: img(casa07),
    gallery: [
      { type: 'image', image: img(casa02), size: 'wide' },
      { type: 'row', images: [img(casa04), img(casa05)], size: 'wide' },
      { type: 'text', text: { en: TEMP.interruption } },
      { type: 'image', image: img(casa03), size: 'bleed' },
      { type: 'image', image: img(casa06), size: 'detail', align: 'end' },
      { type: 'row', images: [img(casa08), img(casa09)], size: 'inset' },
      { type: 'image', image: img(casa10), size: 'detail', align: 'start' },
      { type: 'image', image: img(casa07), size: 'wide' },
    ],
    credits: [],
    featured: true,
    homepageOrder: 4,
    seo: null,
  },
  {
    id: 'l-inconnue',
    title: 'L Inconnue',
    projectType: null,
    location: null,
    year: null,
    area: null,
    shortDescription: { en: TEMP.short },
    projectStory: { en: [TEMP.paragraph, TEMP.paragraphThird] },
    heroImage: img(linc01),
    coverImage: img(linc06),
    gallery: [
      { type: 'image', image: img(linc02), size: 'wide' },
      { type: 'row', images: [img(linc05), img(linc06), img(linc07)], size: 'wide' },
      { type: 'text', text: { en: TEMP.interruption } },
      { type: 'image', image: img(linc03), size: 'bleed' },
      { type: 'row', images: [img(linc08), img(linc09)], size: 'inset' },
      { type: 'image', image: img(linc04), size: 'wide' },
    ],
    credits: [],
    featured: true,
    homepageOrder: 2,
    seo: null,
  },
  {
    id: 'maison-elan',
    title: 'Maison Elan',
    projectType: null,
    location: null,
    year: null,
    area: null,
    shortDescription: { en: TEMP.short },
    projectStory: { en: [TEMP.paragraphAlt, TEMP.paragraph] },
    heroImage: img(elan01),
    coverImage: img(elan02),
    gallery: [
      { type: 'image', image: img(elan02), size: 'wide' },
      { type: 'row', images: [img(elan07), img(elan06)], size: 'wide' },
      { type: 'text', text: { en: TEMP.interruption } },
      { type: 'image', image: img(elan04), size: 'bleed' },
      { type: 'row', images: [img(elan08), img(elan09)], size: 'inset' },
      { type: 'image', image: img(elan03), size: 'wide' },
      { type: 'image', image: img(elan10), size: 'detail', align: 'start' },
      { type: 'image', image: img(elan05), size: 'wide' },
    ],
    credits: [],
    featured: true,
    homepageOrder: 1,
    seo: null,
  },
  {
    id: 'walden',
    title: 'Walden',
    projectType: null,
    location: null,
    year: null,
    area: null,
    shortDescription: { en: TEMP.short },
    projectStory: { en: [TEMP.paragraphThird, TEMP.paragraphAlt] },
    heroImage: img(walden01),
    coverImage: img(walden05),
    gallery: [
      { type: 'row', images: [img(walden02), img(walden04)], size: 'wide' },
      { type: 'image', image: img(walden05), size: 'bleed' },
      { type: 'text', text: { en: TEMP.interruption } },
      { type: 'row', images: [img(walden06), img(walden03)], size: 'wide' },
      { type: 'image', image: img(walden08), size: 'detail', align: 'end' },
      { type: 'image', image: img(walden07), size: 'wide' },
      { type: 'image', image: img(walden09), size: 'wide' },
      { type: 'row', images: [img(walden10), img(walden11)], size: 'inset' },
      { type: 'image', image: img(walden12), size: 'wide' },
    ],
    credits: [],
    featured: true,
    homepageOrder: 3,
    seo: null,
  },
];
