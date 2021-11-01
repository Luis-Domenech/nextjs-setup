import React, { useContext, useEffect } from 'react'
import { Box, Button, Flex, Link, Switch, useColorMode, Select } from '@chakra-ui/react'
import NextLink from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

// Relative Imports
import { Locale, ComponentName } from '../utils/types'
import USDC from './icons/USDC'
import { NextPage } from 'next'
import { LanguageContext } from '../contexts/LanguageProvider'
import { LocaleToName } from '../utils/constants'
import useTranslation from '../utils/useTranslation'
import { LocaleKeys } from '../intl'

const NavBar: NextPage = () => {

  const { colorMode, toggleColorMode } = useColorMode()

  // Language
  const { locale, setLocale } = useContext(LanguageContext)
  const { t } = useTranslation(ComponentName.navbar)
  const keys = LocaleKeys[ComponentName.navbar]

  // Runs once only
  useEffect(() => {
    (async () => {
      
    })()
  }, [])

  const handleLanguageChange = async (event: React.SyntheticEvent<HTMLSelectElement, Event>) => {    
    setLocale(event.currentTarget.value as Locale)
  }

  const language_options = Object.keys(LocaleToName).map(loc => {
    return (
      <option value={loc} key={loc}>{LocaleToName[loc as Locale]}</option>
    )
  })

  return (
    <Flex zIndex={1} shadow="md" position="sticky" top={0} bg={colorMode === 'dark' ? "gray.800" : "teal.500"} p={4}>
      <Flex maxW={1240} align="center" flex={1} m="auto">
        <NextLink href="/">
          <Link style={{textDecoration: 'none'}}>
            {/* <Heading>Collider</Heading> */}
            <USDC />
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex align="center">
            <Select variant="filled" mr={4} onChange={handleLanguageChange} value={locale}>
              { language_options }
            </Select>
            <NextLink href="/page1">
              <Link style={{textDecoration: 'none'}}>
                <Button mr={4}>{ t(keys.page1) }</Button>
              </Link>
            </NextLink>
            <NextLink href="/page2">
              <Link style={{textDecoration: 'none'}}>
                <Button mr={4}>{t(keys.page2)}</Button>
              </Link>
            </NextLink>
            { colorMode === 'dark' ? 
              <SunIcon mr={4} boxSize={8} onClick={toggleColorMode} cursor="pointer" /> : 
              <MoonIcon mr={4} boxSize={8} onClick={toggleColorMode} cursor="pointer" />
            }
            <Switch mr={4} isChecked={colorMode === 'light' ? false : true} onChange={toggleColorMode}  size="lg" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}



export default NavBar

