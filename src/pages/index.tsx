import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

const sections = [
  {
    label: 'START',
    title: 'Get Started',
    description: 'Install Codebolt, run your first agent, and learn the core concepts.',
    link: '/docs/get-started/overview',
  },
  {
    label: 'USE',
    title: 'Using Codebolt',
    description: 'Use chat, the editor, agents, planning, and automation in your workspace.',
    link: '/docs/using-codebolt/surfaces/desktop-app/chat/overview',
  },
  {
    label: 'BUILD',
    title: 'Extend',
    description: 'Build custom agents, visual flows, tools, plugins, and providers.',
    link: '/docs/build-on-codebolt/overview',
  },
  {
    label: 'SCALE',
    title: 'Scaling Agents',
    description: 'Run agents in parallel and coordinate work across local and cloud environments.',
    link: '/docs/scaling-agents/overview',
  },
  {
    label: 'CONFIGURE',
    title: 'Configuration',
    description: 'Configure projects, models, agent behavior, environments, and collaboration.',
    link: '/docs/configuration/overview',
  },
  {
    label: 'REFERENCE',
    title: 'Reference',
    description: 'Look up SDK APIs, types, and CLI commands.',
    link: '/docs/reference/overview',
  },
]

function SectionCard({ label, title, description, link }: (typeof sections)[0]) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />
      <span className={styles.cardLabel}>{label}</span>
      <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardArrow}>&#8594;</span>
    </Link>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="AI-native coding environment with multi-agent orchestration, MCP tooling, and extensible agent architecture"
    >
      <div className={styles.page}>
        <div className={styles.gridBg} />

        <header className={styles.hero}>
          <div className={clsx('container', styles.heroInner)}>
            <Heading as="h1" className={styles.heroTitle}>
              CodeBolt Docs
            </Heading>
            <p className={styles.heroSubtitle}>
              Everything you need to build, customize, and deploy AI&#8209;powered coding agents.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.btnPrimary} to="/docs/get-started/quickstart">
                Get Started
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 6H12M9 3l3 3-3 3" />
                </svg>
              </Link>
              <Link className={styles.btnSecondary} to="/docs/reference/overview">
                API Reference
              </Link>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={clsx('container', styles.sectionGrid)}>
            {sections.map((section) => (
              <SectionCard key={section.title} {...section} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}
