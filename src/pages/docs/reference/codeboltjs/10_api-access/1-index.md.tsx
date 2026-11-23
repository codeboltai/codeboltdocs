import React from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function DirectApiAccessRedirect() {
  return <Redirect to={useBaseUrl('/docs/reference/codeboltjs/api-access/index')} />;
}
