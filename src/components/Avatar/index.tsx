/** @jsxImportSource @emotion/react */

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import * as styles from './styles';

type Props = Readonly<{
  role: string;
  name: string;
  alias: string;
  avatarUrl: string;
  notifications: number;
}>;

function Avatar(props: Props): JSX.Element {
  const { name, alias, avatarUrl, notifications } = props;

  return (
    <Flex>
      <Box mr="20px" position="relative">
        <img css={styles.img} src={avatarUrl} alt="avatar Logo" />
        {notifications > 0 && (
          <Box {...styles.notificationBox} position="absolute" />
        )}
      </Box>
      <Box display={{ base: 'none', lg: 'block' }} mr="6">
        <p>{name}</p>
        <Text textAlign="center">{alias}</Text>
      </Box>
      <Menu>
        <MenuButton
          variant="outline"
          _hover={{ bg: 'blue.400', color: 'white' }}
          _expanded={{ bg: 'blue.400', color: 'white' }}
          as={IconButton}
          icon={<ChevronDownIcon />}
          colorScheme="twitter"
        />
        <MenuList>
          <Link to="/plans">
            <MenuItem color="black">Plans</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Avatar;
