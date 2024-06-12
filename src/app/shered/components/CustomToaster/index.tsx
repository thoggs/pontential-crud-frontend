import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useMantineColorScheme } from '@mantine/core';

const CustomToaster = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          background: colorScheme === 'dark' ? '#3A3B3E' : '#FFFFFF',
          color: colorScheme === 'dark' ? '#FFFFFF' : '#1A1B1E',
        },
      }}
    />
  );
};

export default CustomToaster;
