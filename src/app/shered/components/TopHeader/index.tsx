import {
  Group,
  Text,
  Flex,
  useMantineColorScheme,
  ActionIcon,
  useComputedColorScheme,
  Burger
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";
import Image from "next/image";
import classes from "./styles.module.scss";
import cx from 'clsx';
import store from "@/app/store";
import { setThemeColor } from "@/app/store/slices/themeColorSlice";
import logo from '../../../../../public/img/logo.png';
import { TopHeaderProps } from "@/app/shered/components/TopHeader/types";

export default function TopHeader({ mobileOpened, desktopOpened, toggleMobile, toggleDesktop }: TopHeaderProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  function onSetThemeColor() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
    store.dispatch(setThemeColor({ themeColor: computedColorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF' }))
  }

  return (
    <Group justify="space-between" className={cx(classes.group)}>
      <Flex
        gap="xl"
        justify="flex-start"
        align="center"
        direction="row">
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm"/>
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm"/>
        <Flex
          gap="sm"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap">
          <Image
            priority
            className={classes.logoImg}
            width={36}
            height={36}
            src={logo}
            alt='Gazin logo'
          />
          <Text className={classes.textLogo} variant="h6">Gazin Tech®</Text>
        </Flex>
      </Flex>
      <Group className={classes.group}>
        <ActionIcon
          className={classes.switch}
          onClick={onSetThemeColor}
          variant="default"
          size="lg"
          radius='md'
          aria-label="Toggle color scheme">
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5}/>
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5}/>
        </ActionIcon>
      </Group>
    </Group>
  )
}