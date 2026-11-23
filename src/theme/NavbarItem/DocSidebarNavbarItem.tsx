import React from 'react';
import {useActiveDocContext, useLayoutDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type {Props} from '@theme/NavbarItem/DocSidebarNavbarItem';
import useSidebarSelection from '../../navigation/useSidebarSelection';

export default function DocSidebarNavbarItem({sidebarId, label, docsPluginId, ...props}: Props) {
  const {activeDoc} = useActiveDocContext(docsPluginId);
  const {link} = useLayoutDocsSidebar(sidebarId, docsPluginId);
  const selection = useSidebarSelection(activeDoc?.id);
  if (!link) {
    throw new Error(`Sidebar "${sidebarId}" has no landing page.`);
  }
  const activeSidebar = selection?.sidebar ?? activeDoc?.sidebar;
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
