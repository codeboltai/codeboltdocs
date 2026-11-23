import React, {useMemo} from 'react';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
  DocsSidebarProvider,
  useActiveDocContext,
  useDocRootMetadata,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import type {Props} from '@theme/DocRoot';
import {addSidebarSelections} from '../../navigation/sidebarSelection';
import useSidebarSelection from '../../navigation/useSidebarSelection';

export default function DocRoot(props: Props) {
  const version = useDocsVersion();
  const {activeDoc} = useActiveDocContext(version.pluginId);
  const metadata = useDocRootMetadata(props);
  const selection = useSidebarSelection(activeDoc?.id);
  const name = selection?.sidebar ?? metadata?.sidebarName;
  const sidebar = name ? version.docsSidebars[name] : undefined;
  const items = useMemo(
    () => name && sidebar ? addSidebarSelections(sidebar, name) : undefined,
    [name, sidebar],
  );

  if (!metadata) return <NotFoundContent />;

  return (
    <HtmlClassNameProvider className={ThemeClassNames.page.docsDocPage}>
      <DocsSidebarProvider name={name} items={items}>
        <DocRootLayout>{metadata.docElement}</DocRootLayout>
      </DocsSidebarProvider>
    </HtmlClassNameProvider>
  );
}
