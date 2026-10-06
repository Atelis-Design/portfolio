import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/locales';
import type { ImageAsset, ProjectRecord } from './types';

// Home hero assets: each project's detail page opens with its Home slide image (same files, not copies).
import heroElan from '../assets/home/hero(1).jpeg';
import heroLinc from '../assets/home/hero(2).jpeg';
import heroWalden from '../assets/home/hero(3).png';
import heroCasa from '../assets/home/hero(4).jpg';

import casa02 from '../assets/projects/casa-olivia/02.jpg';
import casa03 from '../assets/projects/casa-olivia/03.jpg';
import casa04 from '../assets/projects/casa-olivia/04.jpg';
import casa05 from '../assets/projects/casa-olivia/05.jpg';
import casa06 from '../assets/projects/casa-olivia/06.jpg';
import casa07 from '../assets/projects/casa-olivia/07.jpg';
import casa08 from '../assets/projects/casa-olivia/08.jpg';
import casa09 from '../assets/projects/casa-olivia/09.jpg';
import casa10 from '../assets/projects/casa-olivia/10.jpg';

import linc02 from '../assets/projects/l-inconnue/02.jpg';
import linc03 from '../assets/projects/l-inconnue/03.jpg';
import linc04 from '../assets/projects/l-inconnue/04.jpg';
import linc05 from '../assets/projects/l-inconnue/05.jpg';
import linc06 from '../assets/projects/l-inconnue/06.jpg';
import linc07 from '../assets/projects/l-inconnue/07.jpg';
import linc08 from '../assets/projects/l-inconnue/08.jpg';
import linc09 from '../assets/projects/l-inconnue/09.jpg';

import elan02 from '../assets/projects/maison-elan/02.jpg';
import elan03 from '../assets/projects/maison-elan/03.jpg';
import elan04 from '../assets/projects/maison-elan/04.jpg';
import elan05 from '../assets/projects/maison-elan/05.jpg';
import elan06 from '../assets/projects/maison-elan/06.jpg';
import elan07 from '../assets/projects/maison-elan/07.jpg';
import elan08 from '../assets/projects/maison-elan/08.jpg';
import elan09 from '../assets/projects/maison-elan/09.jpg';
import elan10 from '../assets/projects/maison-elan/10.jpg';

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

/** Project copy is complete in every locale (no fallback): a missing locale fails `astro check`. */
type Complete = Record<Locale, string>;

/** Scope shared by more than one project. */
const SCOPE_INTERIOR_CONCEPT = {
  de: 'Innenarchitektur & Konzeptdesign',
  tr: 'İç Mimarlık & Konsept Tasarım',
  en: 'Interior Architecture & Concept Design',
  fr: 'Architecture intérieure & design conceptuel',
  es: 'Arquitectura interior y diseño conceptual',
  it: 'Architettura d’interni e concept design',
  ru: 'Архитектура интерьера и концепт-дизайн',
} satisfies Complete;

/**
 * LOCAL PROJECT DATA — temporary source until Sanity.
 *
 * Titles, category, concept, listing order, facts and descriptions are
 * client-approved (Batur Berrak). The descriptions were supplied in Turkish;
 * German is the primary public copy, the other locales follow its meaning.
 * `heroIntro` is the one sentence shown in the detail page's information panel
 * (German approved, the other locales follow it); `description` is kept for the
 * meta description and later editorial use and is not rendered on the page.
 * Never add facts the client has not supplied; a `null` field is simply not shown.
 *
 * Order: `listingOrder` is the one canonical project order (Projects index,
 * numbering, previous/next). Adding a project = one more record with the next number.
 *
 * Images: `heroImage` opens the detail page and is the project's Home slide image;
 * `gallery` follows in viewing order, room by room as in the client's portfolio.
 * The folders' `01.jpg` files are the same photographs as the Home slide images,
 * so they are not listed again.
 */
export const PROJECTS: ProjectRecord[] = [
  {
    id: 'l-inconnue',
    title: 'L’Inconnue',
    portfolioCategory: 'residential',
    concept: 'Modern Classic / Editorial Interior',
    listingOrder: 1,
    projectType: {
      de: 'Wohnung / Konzeptresidenz',
      tr: 'Daire / Konsept Konut',
      en: 'Apartment / Concept Residence',
      fr: 'Appartement / Résidence concept',
      es: 'Apartamento / Residencia conceptual',
      it: 'Appartamento / Residenza concept',
      ru: 'Квартира / Концептуальная резиденция',
    } satisfies Complete,
    heroIntro: {
      de: 'Ein charakterstarkes Wohnkonzept, das klassische Architektur mit Kunst und skulpturalen Formen verbindet.',
      tr: 'Klasik mimariyi sanat ve heykelsi formlarla buluşturan, karakteri güçlü bir konut konsepti.',
      en: 'A distinctive residential concept that brings classical architecture together with art and sculptural forms.',
      fr: 'Un concept résidentiel de caractère, qui associe architecture classique, art et formes sculpturales.',
      es: 'Un concepto residencial con carácter que une arquitectura clásica, arte y formas escultóricas.',
      it: 'Un concept residenziale di carattere che unisce architettura classica, arte e forme scultoree.',
      ru: 'Выразительная жилая концепция, соединяющая классическую архитектуру с искусством и скульптурными формами.',
    } satisfies Complete,
    description: {
      de: 'L’Inconnue ist ein charakterbetontes Wohnprojekt, das die Figur einer unbekannten Frau in den Mittelpunkt einer räumlichen Erzählung stellt. Klassische Wandprofile und Bogenelemente erhalten durch Nachtblau, rote Akzente, gebrochenes Weiß und warme Messingdetails eine zeitgenössische Interpretation. Wiederkehrende Porträts, grafische Kompositionen und skulpturale Möbel lassen über die verschiedenen Räume hinweg eine visuelle Geschichte entstehen. Das Projekt besitzt eine starke, editoriale Identität, die die Grenze zwischen Innenarchitektur und Kunst verschwimmen lässt.',
      tr: 'L’Inconnue, kimliği bilinmeyen bir kadın figürünü mekânsal bir anlatının merkezine yerleştiren karakter odaklı bir konut projesidir. Klasik duvar profilleri ve kemerli mimari öğeler; gece mavisi, kırmızı vurgular, kırık beyazlar ve sıcak pirinç detaylarla çağdaş bir yorum kazanır. Tekrarlanan portreler, grafik kompozisyonlar ve heykelsi mobilyalar farklı mekânlar arasında görsel bir hikâye oluşturur. Proje, iç mimari ile sanat arasındaki sınırı bulanıklaştıran güçlü ve editorial bir kimliğe sahiptir.',
      en: 'L’Inconnue is a character-driven residential project that places the figure of an unknown woman at the centre of a spatial narrative. Classical wall mouldings and arched architectural elements are given a contemporary reading through night blue, red accents, off-whites and warm brass details. Recurring portraits, graphic compositions and sculptural furniture build a visual story across the different rooms. The project carries a strong, editorial identity that blurs the line between interior architecture and art.',
      fr: 'L’Inconnue est un projet résidentiel porté par un personnage : la figure d’une femme à l’identité inconnue y occupe le centre d’un récit spatial. Moulures murales classiques et éléments architecturaux en arc trouvent une lecture contemporaine à travers le bleu nuit, les accents rouges, les blancs cassés et de chaleureux détails en laiton. Portraits récurrents, compositions graphiques et mobilier sculptural tissent une histoire visuelle d’une pièce à l’autre. Le projet affirme une identité forte et éditoriale, qui estompe la frontière entre architecture intérieure et art.',
      es: 'L’Inconnue es un proyecto residencial centrado en un personaje, que sitúa la figura de una mujer de identidad desconocida en el centro de un relato espacial. Las molduras clásicas y los elementos arquitectónicos en arco adquieren una lectura contemporánea a través del azul noche, los acentos rojos, los blancos rotos y los cálidos detalles en latón. Retratos recurrentes, composiciones gráficas y mobiliario escultórico construyen una historia visual entre las distintas estancias. El proyecto posee una identidad sólida y editorial que difumina el límite entre la arquitectura interior y el arte.',
      it: 'L’Inconnue è un progetto residenziale incentrato su un personaggio, che pone la figura di una donna dall’identità sconosciuta al centro di una narrazione spaziale. Le modanature classiche e gli elementi architettonici ad arco acquistano una lettura contemporanea attraverso il blu notte, gli accenti rossi, le tonalità bianco sporco e i caldi dettagli in ottone. Ritratti ricorrenti, composizioni grafiche e arredi scultorei costruiscono un racconto visivo tra i diversi ambienti. Il progetto possiede un’identità forte ed editoriale, che sfuma il confine tra architettura d’interni e arte.',
      ru: 'L’Inconnue — жилой проект, выстроенный вокруг персонажа: в центре пространственного повествования находится образ женщины, чья личность остаётся неизвестной. Классические настенные профили и арочные архитектурные элементы получают современное прочтение благодаря ночному синему, красным акцентам, приглушённым белым тонам и тёплым латунным деталям. Повторяющиеся портреты, графические композиции и скульптурная мебель выстраивают визуальную историю, связывающую разные помещения. Проект обладает сильной идентичностью в эстетике editorial, стирающей границу между архитектурой интерьера и искусством.',
    } satisfies Complete,
    location: {
      de: 'Paris, Frankreich',
      tr: 'Paris, Fransa',
      en: 'Paris, France',
      fr: 'Paris, France',
      es: 'París, Francia',
      it: 'Parigi, Francia',
      ru: 'Париж, Франция',
    } satisfies Complete,
    year: 2026,
    area: '120 m²',
    scope: {
      de: 'Innenarchitektur, Konzeptdesign & Art Direction',
      tr: 'İç Mimarlık, Konsept Tasarım & Sanat Yönetimi',
      en: 'Interior Architecture, Concept Design & Art Direction',
      fr: 'Architecture intérieure, design conceptuel & direction artistique',
      es: 'Arquitectura interior, diseño conceptual y dirección de arte',
      it: 'Architettura d’interni, concept design e direzione artistica',
      ru: 'Архитектура интерьера, концепт-дизайн и арт-дирекшн',
    } satisfies Complete,
    heroImage: img(heroLinc),
    coverImage: img(linc06),
    // living room · bedroom · kitchen · WC
    gallery: [
      img(linc05),
      // portrait format: the centred 16:9 crop would cut the muse's face out of the painting
      { ...img(linc06), position: '50% 30%' },
      ...[linc02, linc08, linc03, linc07, linc04, linc09].map(img),
    ],
    credits: [],
    featured: true,
    homepageOrder: 1,
    seo: null,
  },
  {
    id: 'maison-elan',
    title: 'Maison Elan',
    portfolioCategory: 'residential',
    concept: 'Contemporary Classic / Sculptural Elegance',
    listingOrder: 2,
    projectType: {
      de: 'Wohnung / Wohninterieur',
      tr: 'Daire / Konut İç Mekânı',
      en: 'Apartment / Residential Interior',
      fr: 'Appartement / Intérieur résidentiel',
      es: 'Apartamento / Interior residencial',
      it: 'Appartamento / Interno residenziale',
      ru: 'Квартира / Жилой интерьер',
    } satisfies Complete,
    heroIntro: {
      de: 'Klassische Raumarchitektur trifft auf eine zeitgenössische, skulpturale Formensprache.',
      tr: 'Klasik mekân mimarisi, çağdaş ve heykelsi bir form diliyle buluşuyor.',
      en: 'Classical interior architecture meets a contemporary, sculptural language of form.',
      fr: 'L’architecture classique des espaces rencontre un langage formel contemporain et sculptural.',
      es: 'La arquitectura clásica del espacio se encuentra con un lenguaje formal contemporáneo y escultórico.',
      it: 'L’architettura classica degli spazi incontra un linguaggio formale contemporaneo e scultoreo.',
      ru: 'Классическая архитектура пространства встречается с современным, скульптурным языком форм.',
    } satisfies Complete,
    description: {
      de: 'Maison Elan interpretiert klassische Raumarchitektur mit einer zeitgenössischen, skulpturalen Gestaltungshaltung neu. Markante Wandprofile, Bögen und eine ausgewogene Symmetrie verbinden sich mit einer kraftvollen Materialpalette aus Naturstein, dunklem Holz, schwarzem Marmor sowie Terrakotta- und Olivtönen. Licht, Kunstobjekte und Möbel werden nicht als dekorative Ergänzung, sondern als Teil der architektonischen Komposition verstanden. Das Ergebnis ist eine zeitlose Wohnatmosphäre, die repräsentativ wirkt, ohne Abstriche beim Wohnkomfort zu machen.',
      tr: 'Maison Elan, klasik mekân mimarisini çağdaş ve heykelsi bir tasarım anlayışıyla yeniden yorumlar. Belirgin duvar profilleri, kemerler ve dengeli simetri; doğal taş, koyu ahşap, siyah mermer, terracotta ve zeytin tonlarından oluşan güçlü bir malzeme paletiyle birleşir. Aydınlatma, sanat objeleri ve mobilyalar dekoratif bir ek olmaktan çok mimari kompozisyonun parçası olarak ele alınır. Sonuç, temsil gücü yüksek ancak yaşam konforundan ödün vermeyen zamansız bir konut atmosferidir.',
      en: 'Maison Elan reinterprets classical room architecture through a contemporary, sculptural approach to design. Pronounced wall mouldings, arches and a balanced symmetry meet a strong material palette of natural stone, dark wood, black marble, terracotta and olive tones. Lighting, art objects and furniture are treated as part of the architectural composition rather than as decorative additions. The result is a timeless residential atmosphere with a strong sense of presence that makes no compromise on living comfort.',
      fr: 'Maison Elan réinterprète l’architecture classique des espaces à travers une approche contemporaine et sculpturale. Moulures murales affirmées, arcs et symétrie équilibrée s’associent à une palette de matériaux puissante : pierre naturelle, bois sombre, marbre noir, tons terracotta et olive. L’éclairage, les objets d’art et le mobilier sont pensés comme des éléments de la composition architecturale plutôt que comme des ajouts décoratifs. Il en résulte une atmosphère résidentielle intemporelle, à forte valeur de représentation, sans concession sur le confort de vie.',
      es: 'Maison Elan reinterpreta la arquitectura clásica del espacio desde un planteamiento contemporáneo y escultórico. Las molduras marcadas, los arcos y una simetría equilibrada se unen a una potente paleta de materiales: piedra natural, madera oscura, mármol negro y tonos terracota y oliva. La iluminación, los objetos de arte y el mobiliario se conciben como parte de la composición arquitectónica, más que como un añadido decorativo. El resultado es una atmósfera residencial atemporal, de marcado carácter representativo, que no renuncia al confort de vida.',
      it: 'Maison Elan reinterpreta l’architettura classica degli spazi attraverso un approccio contemporaneo e scultoreo. Modanature marcate, archi e una simmetria equilibrata si uniscono a una palette materica decisa: pietra naturale, legno scuro, marmo nero, toni terracotta e oliva. Illuminazione, oggetti d’arte e arredi sono trattati come parte della composizione architettonica, più che come un’aggiunta decorativa. Il risultato è un’atmosfera residenziale senza tempo, di forte rappresentanza, che non rinuncia al comfort abitativo.',
      ru: 'Maison Elan переосмысливает классическую архитектуру пространства через современный, скульптурный подход к дизайну. Выразительные настенные профили, арки и уравновешенная симметрия сочетаются с сильной палитрой материалов: натуральный камень, тёмное дерево, чёрный мрамор, терракотовые и оливковые оттенки. Освещение, арт-объекты и мебель рассматриваются не как декоративное дополнение, а как часть архитектурной композиции. В результате возникает вневременная жилая атмосфера — представительная, но не жертвующая комфортом жизни.',
    } satisfies Complete,
    location: {
      de: 'Istanbul, Türkei',
      tr: 'İstanbul, Türkiye',
      en: 'Istanbul, Türkiye',
      fr: 'Istanbul, Turquie',
      es: 'Estambul, Turquía',
      it: 'Istanbul, Turchia',
      ru: 'Стамбул, Турция',
    } satisfies Complete,
    year: 2026,
    area: '165 m²',
    scope: {
      de: 'Innenarchitektur, Raumplanung & FF&E',
      tr: 'İç Mimarlık, Mekân Planlaması & FF&E',
      en: 'Interior Architecture, Space Planning & FF&E',
      fr: 'Architecture intérieure, agencement des espaces & FF&E',
      es: 'Arquitectura interior, planificación del espacio y FF&E',
      it: 'Architettura d’interni, pianificazione degli spazi e FF&E',
      ru: 'Архитектура интерьера, планировка пространства и FF&E',
    } satisfies Complete,
    heroImage: img(heroElan),
    coverImage: img(elan02),
    // living room · dining room · bedroom · WC · kitchen
    gallery: [elan07, elan06, elan08, elan03, elan10, elan02, elan09, elan05, elan04].map(img),
    credits: [],
    featured: true,
    homepageOrder: 2,
    seo: null,
  },
  {
    id: 'walden',
    title: 'Walden',
    portfolioCategory: 'residential',
    concept: 'Contemporary Alpine / Quiet Luxury',
    listingOrder: 3,
    projectType: {
      de: 'Private Penthouse-Residenz',
      tr: 'Özel Penthouse Konutu',
      en: 'Private Penthouse Residence',
      fr: 'Résidence penthouse privée',
      es: 'Residencia penthouse privada',
      it: 'Residenza penthouse privata',
      ru: 'Частная резиденция-пентхаус',
    } satisfies Complete,
    heroIntro: {
      de: 'Ein ruhiges Penthouse-Konzept, das zeitgenössischen Luxus mit Natur und Materialität verbindet.',
      tr: 'Çağdaş lüksü doğa ve malzemeyle buluşturan dingin bir penthouse konsepti.',
      en: 'A calm penthouse concept that unites contemporary luxury with nature and materiality.',
      fr: 'Un concept de penthouse serein, qui associe luxe contemporain, nature et matérialité.',
      es: 'Un concepto de penthouse sereno que une el lujo contemporáneo con la naturaleza y la materialidad.',
      it: 'Un concept di penthouse sereno che unisce lusso contemporaneo, natura e matericità.',
      ru: 'Спокойная концепция пентхауса, соединяющая современную роскошь с природой и материальностью.',
    } satisfies Complete,
    description: {
      de: 'Walden ist ein großzügig dimensioniertes Penthouse-Projekt, das zeitgenössischen Luxus über eine ruhige und zugleich kraftvolle Beziehung zur Natur definiert. Dunkles Walnussholz, helle Natursteinoberflächen, warme, neutrale Textilien und zurückhaltend eingesetzte Bronzedetails bilden die reduzierte Materialsprache des Projekts. Weite Blickachsen, visuelle Bezüge zur natürlichen Umgebung und eine vielschichtige Beleuchtung schaffen im gesamten Raum eine gelassene Atmosphäre. Anstelle von Effekten stehen Proportion, Materialqualität und architektonische Geschlossenheit im Vordergrund.',
      tr: 'Walden, çağdaş lüksü doğayla kurulan sakin ve güçlü bir ilişki üzerinden ele alan geniş ölçekli bir penthouse projesidir. Koyu ceviz, açık doğal taş yüzeyler, sıcak nötr tekstiller ve kontrollü bronz detaylar projenin yalın malzeme dilini oluşturur. Geniş görüş aksları, doğal çevreyle kurulan görsel bağlantılar ve katmanlı aydınlatma mekân boyunca dingin bir atmosfer yaratır. Tasarımda gösteriş yerine oran, malzeme kalitesi ve mimari bütünlük ön plana çıkar.',
      en: 'Walden is a large-scale penthouse project that approaches contemporary luxury through a calm yet powerful relationship with nature. Dark walnut, light natural stone surfaces, warm neutral textiles and restrained bronze details form the project’s pared-back material language. Long sightlines, visual connections to the natural surroundings and layered lighting create a serene atmosphere throughout the space. Proportion, material quality and architectural coherence take precedence over display.',
      fr: 'Walden est un projet de penthouse de grande échelle qui aborde le luxe contemporain à travers une relation calme et forte avec la nature. Noyer foncé, surfaces en pierre naturelle claire, textiles neutres et chaleureux, détails en bronze maîtrisés composent le langage matériel épuré du projet. De larges axes de vue, des liens visuels avec l’environnement naturel et un éclairage stratifié installent une atmosphère sereine dans l’ensemble de l’espace. Plutôt que l’ostentation, le projet privilégie la proportion, la qualité des matériaux et la cohérence architecturale.',
      es: 'Walden es un proyecto de penthouse de gran escala que aborda el lujo contemporáneo a través de una relación serena y poderosa con la naturaleza. El nogal oscuro, las superficies de piedra natural clara, los textiles neutros y cálidos y los contenidos detalles en bronce conforman el lenguaje material depurado del proyecto. Las amplias líneas visuales, los vínculos con el entorno natural y una iluminación por capas crean una atmósfera sosegada en todo el espacio. En el diseño, la proporción, la calidad de los materiales y la coherencia arquitectónica priman sobre la ostentación.',
      it: 'Walden è un progetto di penthouse di ampia scala che interpreta il lusso contemporaneo attraverso un rapporto calmo e intenso con la natura. Noce scuro, superfici chiare in pietra naturale, tessuti neutri e caldi e misurati dettagli in bronzo definiscono il linguaggio materico essenziale del progetto. Ampi assi visivi, connessioni visive con l’ambiente naturale e un’illuminazione stratificata creano un’atmosfera quieta in tutto lo spazio. Nel progetto, proporzione, qualità dei materiali e coerenza architettonica prevalgono sull’ostentazione.',
      ru: 'Walden — масштабный проект пентхауса, в котором современная роскошь раскрывается через спокойную и сильную связь с природой. Тёмный орех, светлые поверхности из натурального камня, тёплый нейтральный текстиль и сдержанные бронзовые детали формируют лаконичный язык материалов проекта. Протяжённые видовые оси, визуальные связи с природным окружением и многослойное освещение создают умиротворённую атмосферу во всём пространстве. На первый план в дизайне выходят не эффектность, а пропорции, качество материалов и архитектурная целостность.',
    } satisfies Complete,
    location: {
      de: 'Luzern, Schweiz',
      tr: 'Luzern, İsviçre',
      en: 'Lucerne, Switzerland',
      fr: 'Lucerne, Suisse',
      es: 'Lucerna, Suiza',
      it: 'Lucerna, Svizzera',
      ru: 'Люцерн, Швейцария',
    } satisfies Complete,
    year: 2026,
    // Client-supplied website figure; supersedes the older 365 m² in the portfolio PDF.
    area: '412 m²',
    scope: SCOPE_INTERIOR_CONCEPT,
    heroImage: img(heroWalden),
    coverImage: img(walden05),
    // living room · bedroom · bar · kitchen · WC · office
    gallery: [walden02, walden04, walden03, walden05, walden06, walden07, walden08, walden12, walden11, walden09, walden10].map(img),
    credits: [],
    featured: true,
    homepageOrder: 3,
    seo: null,
  },
  {
    id: 'casa-olivia',
    title: 'Casa Olivia',
    portfolioCategory: 'residential',
    concept: 'Organic Contemporary / Mediterranean Living',
    listingOrder: 4,
    projectType: {
      de: 'Wohninterieur / 2-Zimmer-Wohnung',
      tr: 'Konut İç Mekânı / 2 Odalı Konut',
      en: 'Residential Interior / 2-Room Residence',
      fr: 'Intérieur résidentiel / Résidence de 2 pièces',
      es: 'Interior residencial / Residencia de 2 habitaciones',
      it: 'Interno residenziale / Residenza bilocale',
      ru: 'Жилой интерьер / Двухкомнатная резиденция',
    } satisfies Complete,
    heroIntro: {
      de: 'Ein warmes Wohnkonzept, das mediterrane Atmosphäre mit organischen Formen und natürlichen Materialien verbindet.',
      tr: 'Akdeniz atmosferini organik formlar ve doğal malzemelerle buluşturan sıcak bir konut konsepti.',
      en: 'A warm residential concept that unites Mediterranean atmosphere with organic forms and natural materials.',
      fr: 'Un concept résidentiel chaleureux, qui associe atmosphère méditerranéenne, formes organiques et matériaux naturels.',
      es: 'Un concepto residencial cálido que une atmósfera mediterránea, formas orgánicas y materiales naturales.',
      it: 'Un concept residenziale caldo che unisce atmosfera mediterranea, forme organiche e materiali naturali.',
      ru: 'Тёплая жилая концепция, соединяющая средиземноморскую атмосферу с органичными формами и натуральными материалами.',
    } satisfies Complete,
    description: {
      de: 'Casa Olivia ist ein kompaktes Wohnprojekt, das die Wärme mediterranen Lebens in eine zeitgenössische, organische Gestaltungssprache übersetzt. Naturstein, warme Holztöne, strukturierte Oberflächen und olivgrüne Details schaffen eine ruhige, in sich stimmige Atmosphäre. Sanfte Bögen, fließende Übergänge und integrierte Nischen lassen den Raum großzügiger und als zusammenhängendes Ganzes erscheinen. Im Mittelpunkt des Entwurfs steht ein warmes, zeitloses und charaktervolles Interieur, das den Alltag vereinfacht.',
      tr: 'Casa Olivia, Akdeniz yaşamının sıcaklığını çağdaş ve organik bir tasarım diliyle yorumlayan kompakt bir konut projesidir. Doğal taş, sıcak ahşap tonları, dokulu yüzeyler ve zeytin yeşili detaylar sakin ve bütüncül bir atmosfer oluşturur. Yumuşak kemerler, akışkan geçişler ve entegre nişler alanın daha ferah ve süreklilik içinde algılanmasını sağlar. Tasarımın merkezinde, gündelik yaşamı sadeleştiren sıcak, zamansız ve karakterli bir iç mekân oluşturmak yer alır.',
      en: 'Casa Olivia is a compact residential project that interprets the warmth of Mediterranean living through a contemporary, organic design language. Natural stone, warm wood tones, textured surfaces and olive-green details create a calm, cohesive atmosphere. Soft arches, fluid transitions and integrated niches allow the space to be perceived as more open and continuous. At the heart of the design is the aim of creating a warm, timeless interior with character that simplifies everyday life.',
      fr: 'Casa Olivia est un projet résidentiel compact qui interprète la chaleur de l’art de vivre méditerranéen dans un langage contemporain et organique. Pierre naturelle, tons de bois chauds, surfaces texturées et détails vert olive composent une atmosphère calme et cohérente. Arcs doux, transitions fluides et niches intégrées donnent à l’espace une perception plus ample et continue. Au cœur du projet : créer un intérieur chaleureux, intemporel et de caractère, qui simplifie la vie quotidienne.',
      es: 'Casa Olivia es un proyecto residencial compacto que interpreta la calidez de la vida mediterránea con un lenguaje de diseño contemporáneo y orgánico. La piedra natural, los tonos cálidos de la madera, las superficies texturizadas y los detalles en verde oliva crean una atmósfera serena y unitaria. Los arcos suaves, las transiciones fluidas y los nichos integrados hacen que el espacio se perciba más amplio y continuo. En el centro del diseño está la creación de un interior cálido, atemporal y con carácter que simplifica la vida cotidiana.',
      it: 'Casa Olivia è un progetto residenziale compatto che interpreta il calore del vivere mediterraneo con un linguaggio progettuale contemporaneo e organico. Pietra naturale, calde tonalità del legno, superfici materiche e dettagli verde oliva creano un’atmosfera calma e coerente. Archi morbidi, passaggi fluidi e nicchie integrate fanno percepire lo spazio come più ampio e continuo. Al centro del progetto c’è la creazione di un interno caldo, senza tempo e di carattere, che semplifica la vita quotidiana.',
      ru: 'Casa Olivia — компактный жилой проект, который передаёт теплоту средиземноморского образа жизни современным, органичным языком дизайна. Натуральный камень, тёплые оттенки дерева, фактурные поверхности и детали оливково-зелёного цвета создают спокойную, целостную атмосферу. Мягкие арки, плавные переходы и встроенные ниши позволяют воспринимать пространство более просторным и непрерывным. В основе дизайна — создание тёплого, вневременного интерьера с характером, упрощающего повседневную жизнь.',
    } satisfies Complete,
    location: {
      de: 'Bodrum, Türkei',
      tr: 'Bodrum, Türkiye',
      en: 'Bodrum, Türkiye',
      fr: 'Bodrum, Turquie',
      es: 'Bodrum, Turquía',
      it: 'Bodrum, Turchia',
      ru: 'Бодрум, Турция',
    } satisfies Complete,
    year: 2026,
    area: '85 m²',
    scope: SCOPE_INTERIOR_CONCEPT,
    heroImage: img(heroCasa),
    coverImage: img(casa07),
    // living room · dining · furniture and lighting in the space (armchair, pendant, sofa, pendant, coffee table)
    gallery: [casa05, casa09, casa03, casa04, casa08, casa10, casa07, casa06, casa02].map(img),
    credits: [],
    featured: true,
    homepageOrder: 4,
    seo: null,
  },
];
