import { useContext, useEffect, useState } from "react"
import { Text, Box, Flex, Image, Heading } from "@chakra-ui/react"

import AppContext from 'context/appContext';
import * as styles from './styles'
import axios from "axios";
import { string } from "yup";

const ImagesURLS = {
  visa: 'https://www.oroyfinanzas.com/files/2015/12/logo-visa-777x437.jpg',
  discover: 'https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png',
  'american-express': 'https://graffica.info/wp-content/uploads/2018/04/american-express-graphic-design-3.jpg',
  mastercard: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png'
}


type Props = Readonly<{
  tabIndex: number
}>

type SelectedPlanType = Readonly<{
  price: number,
  name: string
}>

type SelectedPlanProps = Readonly<{
  tabIndex: number,
  selectedPlan: SelectedPlanType
}>

type TotalCalculationProps = Readonly<{
  tabIndex: number,
  selectedPlan: SelectedPlanType
  tax: number,
}>

type CreditCardsPreviewProps = Readonly<{
  creditCardInfo: {
    cardNumber: string,
    nameOnCard: string,
    expiredDate: string,
    cardType: string
  },
  selectedPlan: SelectedPlanType,
  tabIndex: number,
  tax: number
}>

const SelectedPlan = (props: SelectedPlanProps) => {
  const {tabIndex, selectedPlan} = props

  if (!(tabIndex === 0 || tabIndex === 1)) return null

  return (
    <>
      <Heading
        size="md"
        color="white"
        mt={{base:"30px", lg: '0' }}
        mb="5"
        textAlign="center"
      >
        Selected Plan
      </Heading>
      <Flex
        {...styles.selectedPlanFlex}
        flexWrap="wrap"
      >
        <Text
          fontSize={{base: "sm", md: "md"}}
          textAlign="center"
          textTransform="uppercase"
          w="100%"
        >
          {selectedPlan.name}
        </Text>
        <Text fontWeight="semibold" fontSize={{base: "lg", md: "xl", lg: "3xl"}} mt="5" textAlign="center">$ {selectedPlan.price} USD / mo</Text>
      </Flex>
    </>
  )
}

const getTotalValue = (price: number, tax = 1) => ((price * tax) / 100 ) + price

const TotalCalculation = (props: TotalCalculationProps) => {
  const {tabIndex, selectedPlan, tax } = props

  if (tabIndex !== 1) return null

  const total = getTotalValue(selectedPlan.price, tax)

  return (
    <Flex
      {...styles.glassmorphism}
      color="white"
      fontWeight="500"
      padding="8"
      flexWrap="wrap"
      borderRadius="2xl"
      width={{base: "60vw", lg: "20vw"}}
      margin="0 auto"
      mt="12"
    >
      <Text w="50%">Subtotal</Text>
      <Text marginBottom="5" textAlign="right" w="50%">{selectedPlan.price} USD</Text>
      <Text w="50%">Tax</Text>
      <Text marginBottom="5" textAlign="right" w="50%">{tax} USD</Text>
      <Box marginBottom="5" height="1px" width="100%" borderBottom="2px"  />
      <Text w="50%">Total</Text>
      <Text textAlign="right" w="50%">{total} USD</Text>
    </Flex>
  )
}

const CreditCardPreview = (props: CreditCardsPreviewProps) => {
  const {
    creditCardInfo: {
      cardNumber,
      nameOnCard,
      expiredDate,
      cardType,
    },
    selectedPlan,
    tax,
    tabIndex
  } = props

  if (tabIndex !== 2) return null

  const total = getTotalValue(selectedPlan.price, tax)


  const imageUrl = (ImagesURLS as any)[cardType]

  return (
    <>
      <Heading size="md" color="white" mb="8" textAlign="center">Credit card preview</Heading>
      <Flex
        {...styles.glassmorphism}
        alignContent="flex-end"
        borderRadius="2xl"
        color="white"
        flexWrap="wrap"
        m="0 auto"
        minHeight="250px"
        p={{sm: "7", lg:"3", xl: "7"}}
        position="relative"
        width={{base: "80%", md: "50%", lg: "85%"}}
      >
        <Text mb="2" w="100%">{cardNumber}</Text>
        <Text mr="4">{expiredDate && 'VALID THRU'}</Text>
        <Text mb="2">{expiredDate}</Text>
        <Text w="100%">{nameOnCard}</Text>
        <Image position="absolute" w="80px" bottom={{sm: "7", lg:"70%", xl: "7"}} right={{sm: "7", lg:"3", xl: "7"}} src={imageUrl} />
      </Flex>
      <Heading size="md" color="white" mt="12" mb="8" textAlign="center">Order Summary</Heading>
      <Box {...styles.glassmorphism} color="white" width="fit-content" margin="0 auto" padding="50px 35px 35px" borderRadius="2xl">
        <Text fontSize="xl" >{selectedPlan.name}</Text>
        <Flex mt="3" justifyContent="space-between" >
          <Text>Total</Text>
          <Text>{total}</Text>
        </Flex>
      </Box>
    </>
  )
}


function Summary (props: Props) {
  const {tabIndex} = props
  const { appState } = useContext(AppContext);
  const [tax, setTax] = useState<number>(0.001)
  const {city, outsideUs} = appState?.userInfo


  useEffect(() => {
    async function fetchData () {
      const { data } = await axios.get("https://run.mocky.io/v3/3d22a479-6587-444c-b2e4-1ad5776355fa")

      data.forEach((state: any) => {
        if (state?.State?.toLowerCase() === city?.toLowerCase()) {
          setTax(Number(state.stateTaxRate))
        }
      })
    }

    if (!outsideUs && city) {
      fetchData()
    } else {
      setTax(0)
    }

  }, [city, outsideUs])


  return (
    <div>
      <SelectedPlan selectedPlan={appState.selectedPlan} tabIndex={tabIndex}/>
      <TotalCalculation selectedPlan={appState.selectedPlan} tabIndex={tabIndex} tax={tax} />
      <CreditCardPreview creditCardInfo={appState.creditCard} selectedPlan={appState.selectedPlan} tabIndex={tabIndex} tax={tax} />
    </div>
  )
}

export default Summary