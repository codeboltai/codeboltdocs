import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CodeBolt',
  tagline: 'AI-native coding environment with multi-agent orchestration, MCP tooling, and extensible agent architecture',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.codebolt.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: false,
  markdown: {
    mermaid: true,
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Typedoc-generated content has thousands of inherited-property cross-
  // references whose anchor IDs don't survive Docusaurus's normalization
  // (collisions with sibling properties, inherited-member mangling, etc.).
  // These are internal to the auto-generated reference and not navigation
  // any reader clicks — ignoring them keeps the build clean.
  onBrokenAnchors: 'ignore',

  customFields: {
    onDuplicatePresets: 'warn',
    onExtraPlugins: 'warn',
  },
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'codeboltai', // Usually your GitHub org/user name.
  projectName: 'codeboltai.github.io', // Usually your repo name.

  onBrokenLinks: 'warn',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:site',
        content: '@codeboltai',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image',
        content: 'https://docs.codebolt.ai/img/docusaurus-social-card.jpg',
      },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CodeBolt Documentation',
        url: 'https://docs.codebolt.ai',
        description: 'AI-native coding environment with multi-agent orchestration, MCP tooling, and extensible agent architecture',
      }),
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    'docusaurus-plugin-image-zoom',
    // Force-exit after build completes. Disabled because it can terminate the
    // process before other post-build plugins, including the sitemap
    // generator, finish writing their output.
    // function forceExitAfterBuild() {
    //   return {
    //     name: 'force-exit-after-build',
    //     async postBuild() {
    //       setImmediate(() => process.exit(0));
    //     },
    //   };
    // },
    // Webpack's persistent filesystem cache (IdleFileCachePlugin) hangs during
    // shutdown-serialize on Windows with this repo. A production build is
    // one-shot, so disabling the cache trades a small speed hit for a clean
    // exit without killing post-build plugin work.
    // function disableWebpackFsCache() {
    //   return {
    //     name: 'disable-webpack-fs-cache',
    //     configureWebpack() {
    //       return { cache: false };
    //     },
    //   };
    // },
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: true,
        indexDocs: true,
        // Exclude auto-generated type-reference pages from the search index.
        // They balloon the index past Cloudflare Workers' 25 MiB per-asset cap
        // and add little search value (most are interface dumps).
        ignoreFiles: [
          /reference\//,
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Exclude auto-generated reference from the dev server file watcher.
          // 05_reference/ contains ~4500 TypeDoc-generated files that cause the
          // watcher to re-index on every save and make hot reload unusably slow.
          // They are still included in production builds — remove this line to
          // regenerate a full build locally.
          exclude: process.env.NODE_ENV === 'development'
            ? ['05_reference/**']
            : ['Issue.md', 'sortspec.md', 'Excalidraw/**'],
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, item, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator({ item, ...args });
            if (item.dirName !== '02_using-codebolt' && item.dirName !== '04_build-on-codebolt') return sidebarItems;

            const result: typeof sidebarItems = [];
            for (const sidebarItem of sidebarItems) {
              const label = (sidebarItem as any).customProps?.sectionLabel;
              if (sidebarItem.type === 'category' && label) {
                result.push({
                  type: 'html',
                  value: `<div class="sidebar-section-label"><span>${label}</span></div>`,
                  defaultStyle: false,
                } as any);

                if (label === 'Platforms' && sidebarItem.label === 'Clients') {
                  result.push(...sidebarItem.items);
                  continue;
                }
              }
              result.push(sidebarItem);
            }
            return result;
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'rss',
            title: 'Codebolt Blog',
            description: 'Updates, guides, and news about Codebolt',
            copyright: `Copyright ${new Date().getFullYear()} Codebolt`,
          },
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [
            '/tags/**',
            '/docs/reference/**',
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'CodeBolt',
      logo: {
        alt: 'CodeBolt Logo',
        src: 'img/logo.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'getStartedSidebar',
          position: 'left',
          label: 'Get Started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'usingCodeboltSidebar',
          position: 'left',
          label: 'Using Codebolt',
        },
        {
          type: 'docSidebar',
          sidebarId: 'conceptsSidebar',
          position: 'left',
          label: 'Concepts',
        },
        {
          type: 'docSidebar',
          sidebarId: 'buildSidebar',
          position: 'left',
          label: 'Build on Codebolt',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        // Reference sidebar is excluded in dev (05_reference files not watched).
        // In dev we show a plain href so the navbar doesn't break.
        ...(process.env.NODE_ENV === 'development'
          ? [{ type: 'html' as const, value: '<span class="navbar__item navbar__link" style="opacity:0.4;cursor:default">Reference</span>', position: 'left' as const }]
          : [{ type: 'docSidebar' as const, sidebarId: 'referenceSidebar', position: 'left' as const, label: 'Reference' }]
        ),
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'devSidebar',
        //   position: 'left',
        //   label: 'Developer Guide',
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'toolSidebar',
        //   position: 'left',
        //   label: 'Tools',
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'appSidebar',
        //   position: 'left',
        //   label: 'Apps',
        // },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },

      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
    zoom: {
      selector: '.theme-doc-markdown img',
      background: {
        light: 'rgba(245, 244, 237, 0.92)',
        dark: 'rgba(20, 20, 18, 0.92)',
      },
      config: {
        margin: 32,
        scrollOffset: 0,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
