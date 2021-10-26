/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useHistory } from 'react-router'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Spacer, Switch } from "@chakra-ui/react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import * as styles from './styles'
import * as globalStyles from 'styles/globlal'
import AppContext from 'context/appContext';

const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

type Props = {
  handleTabsChange: (index: number) => void,
  setActiveTab: Dispatch<SetStateAction<boolean>>,
}

type PhoneState = {
  value: string,
  error: boolean,
  touched: boolean
}

const GetFormikValues = (
  handleTabsChange: (index: number) => void,
  phone: PhoneState,
  setPhone: Dispatch<SetStateAction<PhoneState>>,
  setActiveTab: Dispatch<SetStateAction<boolean>>,
  actions: any
) => {
  return useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      city: '',
      postalCode: '',
      phone: null,
      outsideUs: false
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Must be 3 characters minimum')
        .required(),
      lastName: Yup.string()
        .min(5, 'Must be 3 characters minimum')
        .required(),
      address: Yup.string().required(),
      country: Yup.string().min(2, "must be at least 2 characters").required(),
      city: Yup.string().min(3, "must be at least 2 characters").required(),
      postalCode: Yup.number().min(4, "must be at least 4 numbers").required(),
      phoneNumber: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid')
    }),
    onSubmit: (values) => {
      if (!phone.value) {
        setPhone({ ...phone, error: true, touched: true })
        return
      }

      setActiveTab(false)
      handleTabsChange(1)
      actions.addUserInfo(
        {
          address: values.address,
          city: values.city,
          firstName: values.firstName,
          lastName: values.lastName,
          outsideUs: values.outsideUs,
        }
      )
    },
  });
}

function CustomerInformation(props: Props) {
  const { handleTabsChange, setActiveTab } = props
  const [phone, setPhone] = useState<PhoneState>({
    value: '',
    error: false,
    touched: false
  })
  const history = useHistory()
  const { actions } = useContext(AppContext);
  const formik = GetFormikValues(handleTabsChange, phone, setPhone, setActiveTab, actions)

  function handleBack() {
    history.push('/plans')
  }

  function handlePhoneChange(phoneValue: string) {
    const isValid = PHONE_REGEX.test(phoneValue)
    setPhone({ value: phoneValue, touched: true, error: !isValid })
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex display={{ base: "block", lg: 'flex' }} mt="10">
          <FormControl mb={{ base: "24px", lg: '0' }} isInvalid={!!formik.errors.firstName && formik.touched.firstName} flex='6'>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <Input
              {...formik.getFieldProps('firstName')}
              {...globalStyles.INPUT_STYLES}
              id="first_name"
              placeholder="First Name"
            />
            <FormErrorMessage color="red.600" data-testid="first-name-error" >{formik.errors.firstName}</FormErrorMessage>
          </FormControl>
          <Spacer />
          <FormControl isInvalid={!!formik.errors.lastName && formik.touched.lastName} flex='6'>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Input
              {...globalStyles.INPUT_STYLES}
              {...formik.getFieldProps('lastName')}
              id="last_name"
              placeholder="Last Name"
            />
            <FormErrorMessage color="red.600">{formik.errors.lastName}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mt="8">
          <FormControl isInvalid={!!formik.errors.address && formik.touched.address} flex="10">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              {...globalStyles.INPUT_STYLES}
              {...formik.getFieldProps('address')}
              id="address"
              placeholder="Address"
            />
            <FormErrorMessage color="red.600">{formik.errors.address}</FormErrorMessage>
          </FormControl>
          <Spacer />
          <FormControl flex="2">
            <FormLabel htmlFor="outside_us" >
              Outside US
            </FormLabel>
            <Switch {...formik.getFieldProps('outsideUs')} size="lg" id="outside_us" />
          </FormControl>
        </Flex>
        <Flex display={{ base: "block", lg: 'flex' }} mt="8">
          <FormControl mb={{ base: "24px", lg: '0' }} isInvalid={!!formik.errors.country && formik.touched.country} flex="6">
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              {...globalStyles.INPUT_STYLES}
              {...formik.getFieldProps('country')}
              id="country"
              placeholder="Country"
            />
            <FormErrorMessage color="red.600">{formik.errors.country}</FormErrorMessage>
          </FormControl>
          <Spacer />
          <FormControl isInvalid={!!formik.errors.city && formik.touched.city} flex="6">
            <FormLabel htmlFor="city">City</FormLabel>
            <Input {...globalStyles.INPUT_STYLES} {...formik.getFieldProps('city')} id="city" placeholder="City" />
            <FormErrorMessage color="red.600">{formik.errors.city}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex display={{ base: "block", lg: 'flex' }} mt="8">
          <FormControl mb={{ base: "24px", lg: '0' }} isInvalid={!!formik.errors.postalCode && formik.touched.postalCode} flex="6">
            <FormLabel htmlFor="postal_code">Postal Code</FormLabel>
            <Input {...globalStyles.INPUT_STYLES} {...formik.getFieldProps('postalCode')} id="postal_code" placeholder="Postal Code" />
            <FormErrorMessage color="red.600">{formik.errors.postalCode}</FormErrorMessage>
          </FormControl>
          <Spacer />
          <FormControl css={styles.formControl} flex="6">
            <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
            <PhoneInput
              disableDropdown
              isValid={() => {
                if (phone.error && phone.touched) return false
                return true
              }}
              value={phone.value}
              onChange={handlePhoneChange}
            />
            <FormErrorMessage color="red.600">{phone.error}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex display={{ base: "block", md: 'flex' }} mt="16" justify="flex-end">
          <Button
            order={2}
            mb={{ base: "24px", md: '0', lg: '0' }}
            w={{ base: '100%', md: '30%', lg: 'auto' }}
            onClick={() => {
              if (!phone.value) {
                setPhone({ ...phone, error: true, touched: true })
                return
              }
            }}
            type="submit"
            colorScheme="orange"
          >
            Continue
          </Button>
          <Button order={1} w={{ base: '100%', md: '30%', lg: 'auto' }} onClick={handleBack} mr="8" colorScheme="orange">Back</Button>
        </Flex>
      </form>
    </>
  )
}

export default CustomerInformation