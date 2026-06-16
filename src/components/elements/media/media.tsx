import { clsx } from 'clsx';
import React from 'react';

import type { MediaProps } from './media.props';
import { STYLES } from './media.style';

export const Media = (props: MediaProps) => {
  const { children, style, at, greaterThan, lessThan, between, className } = props;

  return (
    <div
      style={style}
      className={clsx(
        STYLES({
          at: at,
          greaterThan: greaterThan,
          lessThan: lessThan,
          between: between,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Media;
