import { BaseElementProps } from '../types/uiTypes';

export function Card({
  className,
  children,
  style,
}: BaseElementProps): JSX.Element {
  return (
    <div
      className={`rounded-2xl bg-white p-2 shadow ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
