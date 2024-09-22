'use client';
import { WalletRoasterSkeuomorphic } from "../components/Roaster";
import FallingSpices from "../components/FallingSpices";
import WalletWrapper from "../components/WalletButton";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <FallingSpices />
      <WalletRoasterSkeuomorphic />
      <div className="absolute top-4 right-4 z-50">
        <WalletWrapper />
      </div>
    </div>
  );
}
