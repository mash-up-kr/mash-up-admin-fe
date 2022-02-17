import React from 'react';

import { LinkProps as ReactRouterDomLinkProps, Link as ReactRouterDomLink } from 'react-router-dom';

const Link = ({ children, ...restProps }: ReactRouterDomLinkProps) => {
  return <ReactRouterDomLink {...restProps}>{children}</ReactRouterDomLink>;
};

export default Link;
