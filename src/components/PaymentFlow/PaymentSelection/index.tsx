import { useContext, useState } from 'react';
import {
  Image,
  Radio,
  RadioGroup,
  FormHelperText,
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Flex,
  Spacer,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { History } from 'history';
import cardValidator from 'card-validator';

import AppContext from 'context/appContext';
import * as styles from './styles';
import * as globalStyles from 'styles/globlal';

type Props = {
  handleTabsChange: (index: number) => void;
};

function GetFormikValues(history: History) {
  return useFormik({
    initialValues: {
      cardNumber: '',
      nameOnCard: '',
      expiredDate: '',
      cvvCard: '',
    },
    validationSchema: Yup.object({
      nameOnCard: Yup.string()
        .min(5, 'must be at least 5 characters')
        .required(),
      expiredDate: Yup.string().required(),
      cvvCard: Yup.number().required(),
      cardNumber: Yup.string()
        .test('test-number', 'Credit Card number is invalid', value => {
          const formatValue = value?.replace(/\s/g, '');
          return cardValidator.number(formatValue).isValid;
        })
        .required(),
    }),
    onSubmit: () => {
      history.push('/success');
    },
  });
}

function PaymentInfo(props: Props) {
  const [value, setValue] = useState('card');
  const { handleTabsChange } = props;
  const history = useHistory();
  const formik = GetFormikValues(history);
  const { actions } = useContext(AppContext);

  const isCard = value === 'card';

  function onChangeCardNumber(event: React.ChangeEvent<HTMLInputElement>) {
    let { value: targetValue } = event.target;
    const formatValue = targetValue?.replace(/\s/g, '');
    const numberValidation = cardValidator.number(formatValue);

    if (targetValue.length < 19) {
      targetValue = targetValue.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    }

    formik.setFieldValue('cardNumber', targetValue);
    actions.cardNumber(targetValue);
    actions.cardType(numberValidation?.card?.type);
  }

  function handleFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    if (isCard) {
      formik.handleSubmit(event);
      return null;
    }

    history.push('/success');
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <RadioGroup defaultValue={value} onChange={setValue} value={value}>
          <Box {...styles.cardBox}>
            <FormControl>
              <Radio value="card" name="payment_type" id="is_credit_card">
                Credit Card
              </Radio>
              <FormHelperText color="gray.200" ml="6">
                Safe money transfer using your bank account. Visa, Master,
                Discover, American Express
              </FormHelperText>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.cardNumber && formik.touched.cardNumber
              }
              mt="6"
            >
              <FormLabel htmlFor="card_number">Card number</FormLabel>
              <Input
                {...globalStyles.INPUT_STYLES}
                {...formik.getFieldProps('cardNumber')}
                disabled={!isCard}
                id="card_number"
                onChange={onChangeCardNumber}
                w={{ base: '100%', lg: '100%' }}
              />
              <FormErrorMessage>{formik.errors.cardNumber}</FormErrorMessage>
            </FormControl>
            <Flex display={{ base: 'block', lg: 'flex' }} mt="6">
              <FormControl
                {...styles.formControl}
                isInvalid={
                  !!formik.errors.nameOnCard && formik.touched.nameOnCard
                }
                flex="8"
              >
                <FormLabel htmlFor="name_on_card">Name on card</FormLabel>
                <Input
                  {...globalStyles.INPUT_STYLES}
                  {...formik.getFieldProps('nameOnCard')}
                  type="text"
                  id="name_on_card"
                  onChange={event => {
                    const { value: targetValue } = event.target;
                    formik.setFieldValue('nameOnCard', targetValue);
                    actions.nameOnCard(targetValue);
                  }}
                  disabled={!isCard}
                />
                <FormErrorMessage>{formik.errors.nameOnCard}</FormErrorMessage>
              </FormControl>
              <Spacer />
              <FormControl
                {...styles.formControl}
                isInvalid={
                  !!formik.errors.expiredDate && formik.touched.expiredDate
                }
                flex="3"
              >
                <FormLabel htmlFor="expired_date">Expire date</FormLabel>
                <Input
                  {...globalStyles.INPUT_STYLES}
                  {...formik.getFieldProps('expiredDate')}
                  disabled={!isCard}
                  type="month"
                  id="expired_date"
                  onChange={event => {
                    const { value: targetValue } = event.target;
                    formik.setFieldValue('expiredDate', targetValue);
                    actions.expiredDate(targetValue);
                  }}
                />
                <FormErrorMessage>{formik.errors.expiredDate}</FormErrorMessage>
              </FormControl>
              <Spacer />
              <FormControl
                w={{ base: '100%', lg: '100%' }}
                isInvalid={!!formik.errors.cvvCard && formik.touched.cvvCard}
                flex="4"
              >
                <FormLabel htmlFor="cvv_card">CVV</FormLabel>
                <Input
                  {...globalStyles.INPUT_STYLES}
                  {...formik.getFieldProps('cvvCard')}
                  disabled={!isCard}
                  id="cvv_card"
                />
                <FormErrorMessage>{formik.errors.cvvCard}</FormErrorMessage>
              </FormControl>
            </Flex>
          </Box>
          <Box {...styles.paypalBox} position="relative">
            <Image
              {...styles.image}
              src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784403_1280.png"
              position="absolute"
            />
            <FormControl>
              <Radio
                onChange={e => {
                  if (e.target.checked) {
                    formik.resetForm();
                    actions.resetCreditCard();
                  }
                }}
                name="payment_type"
                value="paypal"
              >
                Paypal
              </Radio>
              <FormHelperText color="gray.200">
                You will be redirected to Paypal website to complete your
                purchase securely
              </FormHelperText>
            </FormControl>
          </Box>
          <Flex {...styles.buttonsWrapper}>
            <Button {...styles.completeButton} type="submit">
              Complete Order
            </Button>
            <Button {...styles.backButton} onClick={() => handleTabsChange(1)}>
              Back
            </Button>
          </Flex>
        </RadioGroup>
      </form>
    </div>
  );
}

export default PaymentInfo;
