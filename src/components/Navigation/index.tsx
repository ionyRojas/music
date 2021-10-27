/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Avatar from 'components/Avatar';
import animationData from './music.json';
import * as styles from './styles';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function Navigation() {
  const [data, setData] = useState({
    role: '',
    name: '',
    alias: '',
    avatarUrl: '',
    notifications: 0,
  });

  useEffect(() => {
    (async function getData() {
      await axios
        .get('https://run.mocky.io/v3/5d47642e-d01c-403f-8011-641fbce4968f')
        .then(response => {
          setData(response.data);
        });
    })();
  }, []);

  return (
    <nav css={styles.nav}>
      <Link css={styles.link} to="/">
        <Lottie
          options={defaultOptions}
          height={70}
          width={70}
          isStopped={false}
          isPaused={false}
        />
        <Heading {...styles.heading}>EMC MUSIC</Heading>
      </Link>
      <Avatar {...data} />
    </nav>
  );
}

export default Navigation;

// background: hsla(191, 75%, 60%, 1);

// background: -moz-linear-gradient(90deg, hsla(191, 75%, 60%, 1) 0%, hsla(248, 87%, 36%, 1) 100%);

// background: -webkit-linear-gradient(90deg, hsla(191, 75%, 60%, 1) 0%, hsla(248, 87%, 36%, 1) 100%);

// filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#4DC9E6", endColorstr="#210CAE", GradientType=1 );
