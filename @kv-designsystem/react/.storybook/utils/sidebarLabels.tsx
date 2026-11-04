type RootCategory = {
  label: string;
  icon?: string;
};

/**
 * Display names for the sidebar's root categories, keyed by root ID. Also used
 * for the category shown in search results.
 */
const rootCategories: Partial<Record<string, RootCategory>> = {
  // komigang: { label: 'Kom i gang' },
  // patterns: { label: 'Bruksmønstre'},
  components: { label: 'Komponenter' },
  hooks: { label: 'Hooks' },
};

/**
 * Looks up the root category of a Storybook title such as `components/Button`,
 * or of a root ID such as `components`. Root IDs are the lowercased first title
 * segment, since none of our roots contain characters that Storybook would
 * replace in an ID.
 */
export function getRootCategory(titleOrRootId: string): RootCategory | undefined {
  return rootCategories[titleOrRootId.split('/')[0].toLowerCase()];
}

/** All root categories, for styles that need one rule per category. */
export function getRootCategories(): RootCategory[] {
  return Object.values(rootCategories).filter((category) => category !== undefined);
}
