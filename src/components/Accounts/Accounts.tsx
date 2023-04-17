import { memo, useMemo} from 'react';
import { useAccount } from '../../contexts/contexts';
import { WalletIcon } from '../../ui/Icons';
import { SigningAccount } from '../../types/walletTypes';
import Account from './Account';

const Accounts = ({
    gotoWalletsView,
    accountConnectHandler,
  }: {
    gotoWalletsView: () => void;
    accountConnectHandler: (
        signingAccount: SigningAccount | undefined
      ) => Promise<void>;
}) => {
    const { connectedAccount, walletsAccounts } = useAccount();


const otherAccounts = useMemo(() => {
    return [...walletsAccounts.values()].filter(
      ({ account }) => account?.address !== connectedAccount?.account?.address
    );
  }, [walletsAccounts, connectedAccount]);


  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="font-brand uppercase">Accounts</div>
        <div
          className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-2xl border border-solid px-4 py-1 "
          onClick={() => gotoWalletsView()}
        >
          <WalletIcon />
          <div className="text-xs font-semibold">Wallets</div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
      <div className="my-4 border-b pb-2">
        {connectedAccount?.account && (
          <Account
            name={connectedAccount.account.name || ''}
            address={connectedAccount.account.address}
            state={{ isConnected: true }}
            clickHandler={() => {
              // disconnect
              accountConnectHandler(undefined);
            }}
          />
        )}
      </div>
      <div className="my-2 flex flex-col gap-2 overflow-auto">
        {otherAccounts.map((signingAccount) => {
          const { account } = signingAccount;
          return (
            <Account
              key={account.address}
              name={account.name || ''}
              address={account.address}
              state={{ isConnected: false }}
              clickHandler={() => accountConnectHandler(signingAccount)}
            />
          );
        })}
      </div>
    </div>
    </>
  );
};

export default memo(Accounts);