import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

const sections = [
  {
    label: 'START',
    title: 'Getting Started',
    description: 'Install Codebolt, run your first agent, and learn the lay of the land.',
    link: '/docs/get-started/what-is-codebolt',
  },
  {
    label: 'USE',
    title: 'Using Codebolt',
    description: 'Day-to-day product reference — surfaces, chat, agents, tools, integrations.',
    link: '/docs/using-codebolt/surfaces/overview',
  },
  {
    label: 'LEARN',
    title: 'Concepts',
    description: 'The mental models — architecture, agents, capabilities, dispute resolution, swarms.',
    link: '/docs/concepts/overview',
  },
  {
    label: 'DO',
    title: 'Guides',
    description: 'Step-by-step tutorials for everyday workflows and multi-agent patterns.',
    link: '/docs/guides/overview',
  },
  {
    label: 'BUILD',
    title: 'Build on Codebolt',
    description: 'Custom agents, processors, tools, hooks, providers, orchestration, internals.',
    link: '/docs/build-on-codebolt/overview',
  },
  {
    label: 'REFERENCE',
    title: 'API & Types',
    description: 'Complete API surface — SDKs, schemas, and the full type reference.',
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
