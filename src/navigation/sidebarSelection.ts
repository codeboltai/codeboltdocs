import type {PropSidebar, SidebarsConfig} from '@docusaurus/plugin-content-docs';
import sidebars from '../../sidebars';

type SidebarEntry = Extract<SidebarsConfig[string], unknown[]>[number];
type Location = {pathname: string; search: string};
type Alias = {
  sidebar: string;
  key: string;
} & ({docId: string} | {href: string});

const menuParameter = 'menu';
const aliases = new Map<string, Alias>();
const pathname = (href: string) => href.split(/[?#]/, 1)[0]!.replace(/\/$/, '');

function aliasKey(sidebar: string, label: string) {
  return `${sidebar}:${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function collectAliases(sidebar: string, items: SidebarEntry[]) {
  for (const item of items) {
    if (typeof item !== 'object') continue;
    if (item.type === 'category' && Array.isArray(item.items)) {
      collectAliases(sidebar, item.items);
    } else if (item.type === 'ref') {
      const key = aliasKey(sidebar, item.label ?? item.id);
      aliases.set(key, {sidebar, key, docId: item.id});
    } else if (item.type === 'link' && item.href.startsWith('/docs/')) {
      const key = aliasKey(sidebar, item.label);
      aliases.set(key, {sidebar, key, href: item.href});
    }
  }
}

for (const [name, items] of Object.entries(sidebars)) {
  collectAliases(name, items);
}

export function getSidebarSelection(location: Location, docId?: string, baseUrl = '/') {
  const key = new URLSearchParams(location.search).get(menuParameter);
  const alias = key ? aliases.get(key) : undefined;
  if (!alias) return undefined;
  const basePath = baseUrl.replace(/\/$/, '');
  const pagePath = location.pathname.startsWith(`${basePath}/`)
    ? location.pathname.slice(basePath.length)
    : location.pathname;
  const matches = 'docId' in alias
    ? alias.docId === docId
    : pathname(alias.href) === pathname(pagePath);
  return matches ? alias : undefined;
}

export function addSidebarSelections(items: PropSidebar, sidebar: string): PropSidebar {
  return items.map(item => {
    if (item.type === 'category') {
      return {...item, items: addSidebarSelections(item.items, sidebar)};
    }
    if (item.type !== 'link') return item;
    const alias = aliases.get(aliasKey(sidebar, item.label));
    if (!alias || ('docId' in alias ? alias.docId !== item.docId : alias.href !== item.href)) {
      return item;
    }
    return {...item, href: getSidebarSelectionPath(alias, item.href)};
  });
}

export function getSidebarSelectionPath(
  selection: Alias,
  pagePath: string,
) {
  const url = new URL('href' in selection ? selection.href : pagePath, 'https://docs.codebolt.ai');
  url.searchParams.set(menuParameter, selection.key);
  return url.pathname + url.search + url.hash;
}

// Keep Docusaurus's breadcrumb renderer and give it only the selected branch.
export function selectedBreadcrumbBranch(
  items: PropSidebar,
  href: string,
  canonicalPath: string,
  docId: string,
): PropSidebar {
  for (const item of items) {
    if (item.type === 'link' && item.href === href) {
      return [{...item, href: canonicalPath, docId}];
    }
    if (item.type === 'category') {
      const branch = selectedBreadcrumbBranch(item.items, href, canonicalPath, docId);
      if (branch.length) return [{...item, items: branch}];
    }
  }
  return [];
}
