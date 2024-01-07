'use client';

import Image from 'next/image';
import './loadingSpinner.scss';

const LoadingSpinner = ({ loading = true, size = 32 }) => {
  if (!loading) {
    return null;
  }

  return (
    <Image
      className="loading-spinner"
      src="/images/logo.svg"
      width={size}
      height={size}
      alt="loading"
    />
  );
};

export default LoadingSpinner;
