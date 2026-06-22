'use client';

import React from 'react';
import LuxuryButton from './LuxuryButton';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
  isCTA?: boolean;
}

export default function Magnetic({ children, range = 85, strength = 0.38, isCTA = false }: MagneticProps) {
  return (
    <LuxuryButton
      magneticRange={range}
      magneticStrength={strength}
      isCTA={isCTA}
    >
      {children}
    </LuxuryButton>
  );
}

