import * as React from 'react';
import { useEffect, useState } from 'react';
import Identicon from '@polkadot/react-identicon';

import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import Wallets from '../Wallets/Wallets';

export const ConnectButton = () => {
    const [visible, setVisible] = useState(false);
  
    const closeModal = () => {
      setVisible(false);
    };
  
    const openModal = () => {
      setVisible(true);
    };
  
    const btnClickHandler = () => openModal();
  
    return (
      <>
        <Button onClick={btnClickHandler}>
          <div className="flex flex-nowrap items-center gap-1">
            {/* {address && (
              <Identicon
                style={{ cursor: 'unset' }}
                value={address}
                theme="polkadot"
                size={18}
              />
            )} */}
            <div className="text-sm">btn title</div>
          </div>
        </Button>
        <Modal open={visible} onClose={() => closeModal()}>
          <div className="flex max-h-[90vh] flex-col px-1 py-2">
            <Wallets />
          </div>
        </Modal>
      </>
    );
  };