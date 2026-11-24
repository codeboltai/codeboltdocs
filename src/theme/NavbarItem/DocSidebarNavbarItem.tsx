import React from 'react';
import {useActiveDocContext, useLayoutDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type {Props} from '@theme/NavbarItem/DocSidebarNavbarItem';
import useSidebarSelection from '../../navigation/useSidebarSelection';

const supportingDocNavbarSections: Record<string, string | undefined> = {
  'build-on-codebolt': 'buildSidebar',
  'using-codebolt': 'usingCodeboltSidebar',
};

export default function DocSidebarNavbarItem({sidebarId, label, docsPluginId, ...props}: Props) {
  const {activeDoc} = useActiveDocContext(docsPluginId);
  const {link} = useLayoutDocsSidebar(sidebarId, docsPluginId);
  const selection = useSidebarSelection(activeDoc?.id);
  if (!link) {
    throw new Error(`Sidebar "${sidebarId}" has no landing page.`);
  }
  const docSidebar = activeDoc?.sidebar === 'supportingDocsSidebar'
    ? supportingDocNavbarSections[activeDoc.id.split('/')[0]!]
    : activeDoc?.sidebar;
  const activeSidebar = selection?.sidebar ?? docSidebar;
  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() => activeSidebar === sidebarId}
      label={label ?? link.label}
      to={link.path}
    />
  );
}
