'use client';

import React, { forwardRef } from 'react';

import type { DivProps } from './div.props';

export const Div = forwardRef<any, DivProps>(function Div(props, ref) {
  const { children, style, onClick, dangerouslySetInnerHTML, dataTestId, role, className, id, onMouseOver, onMouseLeave, ...rest } = props;

  return (
    <div
      data-testid={dataTestId}
      id={id}
      role={role}
      className={`flex flex-row ${className}`}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      onClick={onClick}
      style={style}
      ref={ref}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Div;
