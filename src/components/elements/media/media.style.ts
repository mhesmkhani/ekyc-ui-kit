import type { MediaProps } from './media.props';

export const AT = {
  xs: 'at-xs:flex',
  sm: 'at-sm:flex',
  md: 'at-md:flex',
  lg: 'at-lg:flex',
};

export const LESS = {
  md: 'lt-md:flex',
  lg: 'lt-lg:flex',
};

export const GREATER = {
  xs: 'gt-xs:flex',
  sm: 'gt-sm:flex',
};

export const BETWEEN = {
  'xs-lg': 'bw-xs-lg:flex',
};

export const STYLES = ({ at, lessThan, greaterThan, between }: MediaProps) => {
  let className = 'hidden';

  if (at) {
    className = `${AT[at]} ${className}`;
  } else if (lessThan) {
    className = `${LESS[lessThan]} ${className}`;
  } else if (greaterThan) {
    className = `${GREATER[greaterThan]} ${className}`;
  } else if (between) {
    className = `${BETWEEN[between]} ${className}`;
  }

  return className;
};
