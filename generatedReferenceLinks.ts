import {existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

type MarkdownNode = {
  type: string;
  url?: string;
  children?: MarkdownNode[];
};

// Generated references link to source files without an extension. Convert those
// links before Docusaurus resolves them, especially on category index pages.
const generatedReference = /(?:^|\/)docs\/05_reference\/(?:02_codeboltjs\/(?:09_type-reference|11_mcp-access|12_utility-functions|pseudo_cli)|03_plugin-sdk\/(?:02_api-reference|type-reference)|04_client-sdk\/(?:02_api-reference|03_event-reference|type-reference)|05_agent-framework\/type-reference)\//;

export function resolveGeneratedReferenceLinks() {
  return (tree: MarkdownNode, file: {path: string}) => {
    if (!generatedReference.test(file.path.replaceAll('\\', '/'))) return;

    const directory = dirname(file.path);
    function visit(node: MarkdownNode) {
      if ((node.type === 'link' || node.type === 'definition') && node.url) {
        const match = /^((?!\/)[\w./-]+)([?#].*)?$/.exec(node.url);
        if (match && !/\.\w+\/?$/.test(match[1])) {
          const [, pathname, suffix = ''] = match;
          const fileLink = `${pathname}.md`;
          const indexLink = `${pathname.replace(/\/$/, '')}/index.md`;
          const target = [fileLink, indexLink].find(candidate =>
            existsSync(resolve(directory, candidate)),
          );
          if (target) node.url = target + suffix;
        }
      }

      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
