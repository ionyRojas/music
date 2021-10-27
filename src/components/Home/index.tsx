import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

import animationData from './listening.json';
import * as styles from './styles';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function Home() {
  return (
    <Flex {...styles.wrapper} wrap="wrap">
      <Box {...styles.lottieWrapper} position="absolute" pointerEvents="none">
        <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
      </Box>
      <Heading {...styles.heading} as="h1" textAlign="center">
        Real Music for Real Life&apos;s
      </Heading>
      <Link to="/plans">
        <Button colorScheme="twitter" zIndex="1">
          Get Your Plan
        </Button>
      </Link>
    </Flex>
  );
}

export default Home;
