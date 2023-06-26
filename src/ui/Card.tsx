import { BaseElementProps } from '../types/uiTypes';

export function Card({
  children,
  style,
}: BaseElementProps): JSX.Element {
  return (
    <div
      className={`rounded-2xl bg-white p-2 shadow snap-start`}
      style={style}
    >
      {children}
    </div>
  );
}
