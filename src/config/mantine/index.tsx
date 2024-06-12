'use client';
import {
  MantineProvider,
  AppShell,
  Container, useMantineColorScheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import React from 'react';
import { RootLayoutProps } from '@/config/mantine/types';
import { Metadata } from 'next';
import { theme } from './theme';
import classes from './styles.module.scss'
import TopHeader from '@/app/shered/components/TopHeader';
import { IconCode } from '@tabler/icons-react';
import CustomNavLink from '@/app/shered/components/CustomNavLink';
import { useDisclosure } from '@mantine/hooks';
import { Toaster } from "react-hot-toast";
import CustomToaster from "@/app/shered/components/CustomToaster";

export let metadata: Metadata = {
  title: 'Gazin Tech - Thiago Rodrigues',
}

export default function RootStyleRegistry({ children }: RootLayoutProps) {
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure();
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure(true);

  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <CustomToaster/>
      <AppShell
        header={{ height: 64, offset: true }}
        className={classes.appShell}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}>
        <AppShell.Header className={classes.header}>
          <TopHeader
            mobileOpened={mobileOpened}
            desktopOpened={desktopOpened}
            toggleMobile={toggleMobile}
            toggleDesktop={toggleDesktop}
          />
        </AppShell.Header>
        <AppShell.Navbar py='xl' px='xs'>
          <CustomNavLink
            href='/developers'
            label='Developers'
            icon={<IconCode size='1rem' stroke={1.5}/>}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container fluid p={'xl'}>
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}
