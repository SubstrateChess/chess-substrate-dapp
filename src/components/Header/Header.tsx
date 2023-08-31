import * as React from 'react';
import { Navbar } from '../../ui/NavBar';
import { ConnectButton } from './ConnectButton';

const tokenUrl = new URL(
  '../../../assets/images/polkadot-token.svg',
  import.meta.url
).toString();
const logoUrl = new URL(
  '../../../assets/images/polkadot-logo.svg',
  import.meta.url
).toString();

export function Header(): JSX.Element {
  return (
    <Navbar>
      <Navbar.Brand>
        <div className="sticky top-0 -z-10 w-full">
          <div className="h-8 w-fit md:hidden">
            <img className="inline h-full" src={tokenUrl} alt="polkadot logo" />
          </div>
          <div className="hidden h-8 items-center gap-2 md:flex">
            <img className="inline h-full" src={logoUrl} alt="polkadot logo" />
            <div className="h-6 w-[2px] bg-gray-400" />
            <span className="font-unbounded text-h5">Chess on Substrate</span>
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item>
          <div className="flex justify-start gap-2 md:justify-end">
            <ConnectButton />
          </div>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
