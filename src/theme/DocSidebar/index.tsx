import React from 'react';
import {useActiveDocContext, useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import type {Props} from '@theme/DocSidebar';
import {getSidebarSelectionPath} from '../../navigation/sidebarSelection';
import useSidebarSelection from '../../navigation/useSidebarSelection';

export default function DocSidebar(props: Props) {
  const {pluginId} = useDocsVersion();
  const {activeDoc} = useActiveDocContext(pluginId);
  const selection = useSidebarSelection(activeDoc?.id);
  const path = selection ? getSidebarSelectionPath(selection, activeDoc?.path ?? props.path) : props.path;
  return <OriginalDocSidebar {...props} path={path} />;
}
