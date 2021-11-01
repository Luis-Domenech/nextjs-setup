import React, { useContext } from "react"
import { Flex, Heading } from "@chakra-ui/react"
import Layout from "../components/Layout"


import { LanguageContext } from "../contexts/LanguageProvider"
import { ComponentName } from "../utils/types"
import styles from '../styles/Home.module.scss'
import UserInfoCard from "../components/UserInfoCard"
import useTranslation from "../utils/useTranslation"
import { LocaleKeys } from "../intl"

const Index = () => {

  // Language
  const { locale, setLocale } = useContext(LanguageContext)
  const { t } = useTranslation(ComponentName.home)
  const keys = LocaleKeys[ComponentName.home]

  return (
    <>
      <Layout>
        <Flex justifyContent="center" align="center" flexDir={["column", "row"]}>
          <Heading mb={[4, 0]}>{t(keys.title)}</Heading>
        </Flex>
        <br />
        <br />
        <UserInfoCard />
      </Layout>
    </>
  )
};

export default Index;
