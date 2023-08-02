import Identicon from '@polkadot/react-identicon';
import { stringShorten } from '@polkadot/util';

export function AccountIcon({
  address,
  name,
  size,
  textClassName,
  copy = false,
}: {
  address: string;
  name?: string;
  size?: number;
  textClassName?: string;
  copy?: boolean;
}) {
  const btnTitle = name || address;
  const style = !copy ? { cursor: 'unset' } : undefined;
  const onCopy = () => {
    console.log('copied');
  };
  return (
    <div className="flex flex-nowrap items-center gap-2">
      <div>
        <Identicon
          style={style}
          value={address}
          theme="polkadot"
          size={size || 18}
          onCopy={copy ? onCopy : undefined}
        />
      </div>
      <div className={`${textClassName || ''}`}>
        {btnTitle}
      </div>
    </div>
  );
}
