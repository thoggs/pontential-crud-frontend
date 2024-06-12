import { usePathname } from 'next/navigation';
import { NavLink } from '@mantine/core';
import React from 'react';
import classes from './styles.module.scss';

export default function CustomNavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavLink
      fw={530}
      className={classes.navlink}
      href={href}
      label={label}
      active={isActive}
      leftSection={icon}
    />
  );
}