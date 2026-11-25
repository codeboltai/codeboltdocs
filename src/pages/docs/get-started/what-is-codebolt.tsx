import React from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function IntroductionRedirect() {
  return <Redirect to={useBaseUrl('/docs/get-started/overview')} />;
}
