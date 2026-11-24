import React from 'react';
import Link from '@docusaurus/Link';
import {useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebar} from '@docusaurus/plugin-content-docs';
import {addSidebarSelections} from '../navigation/sidebarSelection';

function TopicList({items}: {items: PropSidebar}) {
  return (
    <ul>
      {items.map((item, index) => {
        if (item.type === 'link') {
          return <li key={index}><Link to={item.href}>{item.label}</Link></li>;
        }
        if (item.type === 'category') {
          return (
            <li key={index}>
              {item.href ? <Link to={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
              <TopicList items={item.items} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

export default function BuildTopicIndex() {
  const {docsSidebars} = useDocsVersion();
  const items = addSidebarSelections(docsSidebars.buildSidebar!, 'buildSidebar');
  return (
    <>
      {items.map(item => item.type === 'category' && (
        <details key={item.label}>
          <summary>{item.label}</summary>
          <TopicList items={item.items} />
        </details>
      ))}
    </>
  );
}
