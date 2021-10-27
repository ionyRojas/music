/** @jsxImportSource @emotion/react */
import Lottie from 'react-lottie';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Circle,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

import AppContext from 'context/appContext';
import * as styles from './styles';
import animationData from './loader.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type PlansPricesProps = {
  personalUse: number;
  familyUse: number;
};

type FeatureListProps = {
  personalUse: boolean;
  familyUse: boolean;
  description: string;
};

type Response = {
  featureList: FeatureListProps[];
  plansPrices: PlansPricesProps;
};

const CheckCircleIcon = () => (
  <Circle {...styles.circle} bg="green.500">
    <CheckIcon />
  </Circle>
);

const CloseCircleIcon = () => (
  <Circle {...styles.circle}>
    <CloseIcon />
  </Circle>
);

function Plans() {
  const [data, setData] = useState<Response>({
    featureList: [],
    plansPrices: {
      personalUse: 0,
      familyUse: 0,
    },
  });
  const history = useHistory();
  const { actions } = useContext(AppContext);

  function handleClickPersonalUse() {
    actions.selectedPlan({
      price: data?.plansPrices?.personalUse,
      name: 'For Personal Use',
    });
    history.push('/payment-process');
  }

  function handleClickFamilyUse() {
    actions.selectedPlan({
      price: data?.plansPrices?.familyUse,
      name: 'For Family Use',
    });
    history.push('/payment-process');
  }

  function handleCancel() {
    history.push('/');
  }

  useEffect(() => {
    (async function getData() {
      await axios
        .get('https://run.mocky.io/v3/eb4c5a60-7099-439d-bedf-ed338c49af5f')
        .then(response => {
          setData(response.data);
        });
    })();
  }, []);

  if (data.featureList.length === 0) {
    return (
      <Lottie
        height={300}
        width={300}
        options={defaultOptions}
        isStopped={false}
        isPaused={false}
      />
    );
  }

  return (
    <Box p="30px" overflowX="auto">
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr {...styles.tr} pos={{ base: 'initial', lg: 'sticky' }}>
            <Th color="white" fontSize={{ base: '0.85em', lg: '1em' }}>
              FEATURES
            </Th>
            <Th {...styles.thTitle} textAlign="center">
              <Text>FOR PERSONAL USE</Text>
              <Button
                data-testid="buy-personal-use"
                onClick={handleClickPersonalUse}
                marginTop={4}
                colorScheme="orange"
                size="lg"
              >
                Buy Now
              </Button>
            </Th>
            <Th {...styles.thTitle} textAlign="center">
              <Text>FOR A FAMILY USE</Text>
              <Button
                data-testid="buy-family-use"
                onClick={handleClickFamilyUse}
                marginTop={4}
                colorScheme="orange"
                size="lg"
              >
                Buy Now
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.featureList.map(feature => (
            <Tr key={`feature-${feature.description}`}>
              <Td color="white" fontSize={{ base: '0.85em', lg: '1em' }}>
                {feature.description}
              </Td>
              <Td borderLeft="1px solid rgb(0 0 0 / 6%) !important">
                <div css={styles.cellIcon}>
                  {feature.personalUse ? (
                    <CheckCircleIcon />
                  ) : (
                    <CloseCircleIcon />
                  )}
                </div>
              </Td>
              <Td borderLeft="1px solid rgb(0 0 0 / 6%) !important">
                <div css={styles.cellIcon}>
                  {feature.familyUse ? (
                    <CheckCircleIcon />
                  ) : (
                    <CloseCircleIcon />
                  )}
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th
              {...styles.thFoot}
              textAlign="center"
              data-testid="personal-price"
            >
              ${data?.plansPrices?.personalUse} USD / mo
            </Th>
            <Th
              {...styles.thFoot}
              textAlign="center"
              data-testid="family-price"
            >
              ${data?.plansPrices?.familyUse} USD / mo
            </Th>
          </Tr>
        </Tfoot>
      </Table>
      <Button onClick={handleCancel} size="lg" colorScheme="red">
        Cancel
      </Button>
    </Box>
  );
}

export default Plans;
