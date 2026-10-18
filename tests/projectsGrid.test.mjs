/**
 * Projects index grid composition (src/lib/projectsGrid.ts).
 * Dependency-free: Node's built-in test runner (`npm test`). Plain JavaScript, so
 * no Node type definitions are needed; type stripping lets it import the
 * TypeScript module directly. Fixtures are plain objects, not project records.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { allGrid, comingSoonCount, emptyCategoryPreviews, visibleCardCount } from '../src/lib/projectsGrid.ts';

const CATEGORIES = ['residential', 'hospitality', 'commercial', 'retail'];
const IMAGES = ['soon-01', 'soon-02'];

/** `n` simulated projects, cycling through `categories`. */
const fixture = (n, categories = ['residential']) =>
  Array.from({ length: n }, (_, i) => ({ id: `p${i + 1}`, category: categories[i % categories.length] }));

const categoriesOf = (projects) => projects.map((project) => project.category);
const projectIds = (grid) =>
  grid.flatMap((slot) => (slot.kind === 'project' ? [slot.project.id] : []));
const fillerImages = (grid) =>
  grid.flatMap((slot) => (slot.kind === 'soon' ? [slot.image] : []));

/** [real projects, expected Coming soon frames] in "All". */
const ALL_CASES = [
  [0, 6],
  [1, 5],
  [3, 3],
  [4, 2],
  [5, 1],
  [6, 1],
  [7, 1],
  [12, 1],
  [13, 1],
  [40, 1],
];

for (const [count, soon] of ALL_CASES) {
  test(`All with ${count} projects: ${count} real + ${soon} Coming soon, projects first`, () => {
    const projects = fixture(count);
    const grid = allGrid(projects, IMAGES);

    assert.equal(grid.length, count + soon);
    assert.equal(comingSoonCount(count), soon);
    assert.deepEqual(projectIds(grid), projects.map((project) => project.id), 'canonical order kept');
    assert.ok(grid.slice(count).every((slot) => slot.kind === 'soon'), 'Coming soon frames trail the projects');
    assert.ok(fillerImages(grid).every((image) => IMAGES.includes(image)), 'only the supplied images are used');
    assert.equal(visibleCardCount('all', categoriesOf(projects)), count + soon);
  });
}

test('today: 4 residential → All 6, Residential 4, empty categories 1 each', () => {
  const projects = fixture(4);
  const categories = categoriesOf(projects);

  assert.deepEqual(fillerImages(allGrid(projects, IMAGES)), ['soon-01', 'soon-02']);
  assert.equal(visibleCardCount('all', categories), 6);
  assert.equal(visibleCardCount('residential', categories), 4);
  for (const category of ['hospitality', 'commercial', 'retail']) {
    assert.equal(visibleCardCount(category, categories), 1);
  }
  assert.deepEqual(
    emptyCategoryPreviews(CATEGORIES, categories, IMAGES).map((preview) => preview.category),
    ['hospitality', 'commercial', 'retail'],
  );
});

test('a category gaining its first project loses its preview and shows only real projects', () => {
  const projects = [...fixture(4), { id: 'p5', category: 'hospitality' }];
  const categories = categoriesOf(projects);

  assert.deepEqual(
    emptyCategoryPreviews(CATEGORIES, categories, IMAGES).map((preview) => preview.category),
    ['commercial', 'retail'],
  );
  assert.equal(visibleCardCount('hospitality', categories), 1);
  assert.equal(visibleCardCount('all', categories), 6);
});

test('12 and 13 mixed-category projects: one grid, every project, one trailing filler', () => {
  for (const count of [12, 13]) {
    const projects = fixture(count, CATEGORIES);
    const grid = allGrid(projects, IMAGES);

    assert.equal(projectIds(grid).length, count);
    assert.equal(grid.at(-1)?.kind, 'soon');
    assert.equal(grid.length, count + 1);
    assert.equal(emptyCategoryPreviews(CATEGORIES, categoriesOf(projects), IMAGES).length, 0);
  }
});

test('missing preview images fail loudly instead of rendering broken frames', () => {
  assert.throws(() => allGrid(fixture(4), []));
});
