import React from 'react';
import {useLocation} from '@docusaurus/router';
import {DocsSidebarProvider, useActiveDocContext, useDocsSidebar, useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import {
  getSidebarSelectionPath,
  selectedBreadcrumbBranch,
} from '../../navigation/sidebarSelection';
import useSidebarSelection from '../../navigation/useSidebarSelection';

export default function DocBreadcrumbs() {
  const location = useLocation();
  const sidebar = useDocsSidebar();
  const {pluginId} = useDocsVersion();
  const {activeDoc} = useActiveDocContext(pluginId);
  const selection = useSidebarSelection(activeDoc?.id);
  if (!sidebar || !activeDoc || !selection) return <OriginalDocBreadcrumbs />;

  const href = getSidebarSelectionPath(selection, activeDoc.path);
  const branch = selectedBreadcrumbBranch(sidebar.items, href, location.pathname, activeDoc.id);
  if (!branch.length) return <OriginalDocBreadcrumbs />;

  return (
    <DocsSidebarProvider name={sidebar.name} items={branch}>
      <OriginalDocBreadcrumbs />
    </DocsSidebarProvider>
  );
}
