import {useLocation} from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getSidebarSelection} from './sidebarSelection';

export default function useSidebarSelection(docId?: string) {
  const location = useLocation();
  const isBrowser = useIsBrowser();
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  // The static HTML is generated for the canonical URL without a query.
  return isBrowser ? getSidebarSelection(location, docId, baseUrl) : undefined;
}
