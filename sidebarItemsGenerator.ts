import type {Options} from '@docusaurus/plugin-content-docs';

type SidebarItemsGenerator = NonNullable<Options['sidebarItemsGenerator']>;
type SidebarItems = Awaited<ReturnType<SidebarItemsGenerator>>;

function unassignedItems(items: SidebarItems, assignedDocs: Set<string>): SidebarItems {
  const result: SidebarItems = [];
  for (const item of items) {
    if (item.type === 'doc' && assignedDocs.has(item.id)) continue;
    if (item.type === 'category') {
      const children = unassignedItems(item.items, assignedDocs);
      const link = item.link?.type === 'doc' && assignedDocs.has(item.link.id)
        ? undefined
        : item.link;
      if (children.length || link) result.push({...item, items: children, link});
    } else {
      result.push(item);
    }
  }
  return result;
}

export const generateSidebarItems: SidebarItemsGenerator = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const items = await defaultSidebarItemsGenerator(args);
  const excluded = args.item.customProps?.excludeDocIds;
  return Array.isArray(excluded) ? unassignedItems(items, new Set(excluded)) : items;
};
