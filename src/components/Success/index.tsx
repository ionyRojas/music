import { Box, Button, Heading } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router';
import animationData from './success.json'

function Success () {
  const history = useHistory()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  function handleClick() {
    history.push('/')
  }

  return (
    <Box>
      <Lottie options={defaultOptions}
        height={320}
        width={320}
        isStopped={false}
        isPaused={false}
      />
        <Heading mt="8" textAlign="center">
          Order Successfully placed
        </Heading>
        <Button d="block" m="0 auto" mt="8" onClick={handleClick} colorScheme="orange">
            Go Back To Home Page
        </Button>
    </Box>
  )
}


export default Success