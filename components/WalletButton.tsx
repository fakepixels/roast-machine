'use client';
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet as OnchainWallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { Wallet as WalletIcon } from 'lucide-react';

type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({
  className,
  text,
  withWalletAggregator = false,
}: WalletWrapperParams) {
  return (
    <>
      <OnchainWallet className="border-3 border-[#0a3083] opacity-95 bg-[#0052FF] hover:bg-[#3170f8] rounded-[24px]">
        <ConnectWallet
          withWalletAggregator={withWalletAggregator}
          text="Get started"
          className="bg-transparent hover:bg-transparent"
        >
          <WalletIcon className="mt-[2px] h-5 w-5" />
          <Name className="text-white" />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2 icon-white" hasCopyAddressOnClick={true}>
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </OnchainWallet>
    </>
  );
}