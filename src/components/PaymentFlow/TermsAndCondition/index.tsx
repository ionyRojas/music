import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import AppContext from 'context/appContext';
import * as styles from './styles';

const MAP_KEY =
  process.env.MAP_KEY || 'AIzaSyDswaX0O39yOsLV0iiX9pZBoDpINBvwBTY';

type Props = {
  handleTabsChange: (index: number) => void;
};

function PaymentInfo(props: Props) {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const { handleTabsChange } = props;
  const { appState } = useContext(AppContext);

  useEffect(() => {
    (async function getAddress() {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${appState.userInfo.address},+${appState.userInfo.city}&key=${MAP_KEY}`,
        )
        .then(data => {
          const location = data?.data?.results?.[0]?.geometry?.location;
          const lat = location?.lat;
          const lng = location?.lng;
          setLatLng({ lat, lng });
        });
    })();
  }, [appState.userInfo.address, appState.userInfo.city]);

  return (
    <div>
      <Grid {...styles.grid}>
        <Box w="100%" height="380px" mt="12">
          <GoogleMapReact
            bootstrapURLKeys={{ key: MAP_KEY }}
            center={{ lat: latLng.lat, lng: latLng.lng }}
            defaultZoom={9}
            yesIWantToUseGoogleMapApiInternals
          >
            <Box {...styles.marker} lat={latLng.lat} lng={latLng.lng} />
          </GoogleMapReact>
        </Box>
        <Box w="100%">
          <Heading as="h1" mt="12" textAlign="center">
            Terms and Conditions
          </Heading>
          <Heading size="lg" mt="12" textAlign="center">
            Welcome to EMC Music App
          </Heading>
          <Text mt="8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            soluta incidunt in quod fuga tempore aspernatur error deleniti
            impedit perferendis ex, sed quas rem qui consequuntur molestiae
            laudantium necessitatibus maiores? Eius, quaerat nostrum ea
            accusamus reiciendis, quas nulla minus error dolorum voluptatum hic
            quasi quod consequatur sint voluptas deserunt totam! Culpa, pariatur
            sed? Nihil ea labore, facilis minus voluptatibus laboriosam.
          </Text>
          <Text mt="8">
            Eligendi optio deleniti nesciunt cum perspiciatis, sequi quasi quos
            aspernatur doloremque! Labore, suscipit voluptas quo quae aut
            exercitationem totam quasi magni eligendi sint perferendis quisquam
            dignissimos atque quis est omnis. Illum ducimus nobis hic aut, ullam
            quibusdam beatae labore cum doloribus soluta aliquid, est laudantium
            deleniti pariatur harum! Natus fugiat velit accusantium distinctio
            necessitatibus neque non minus nulla magni minima.
          </Text>
          <Text mt="8">
            Sint nemo molestiae id aperiam incidunt minus nesciunt quidem non
            possimus voluptatibus quam enim placeat nam explicabo, aliquid eos
            quaerat. Impedit magnam voluptate neque quidem aliquid mollitia
            recusandae. Praesentium, amet. Aspernatur suscipit placeat aut ad
            ullam temporibus, aperiam ipsa. Id ipsam, unde iusto perspiciatis
            culpa illo obcaecati fuga officia harum ab, ullam blanditiis dolorum
            quod sapiente cupiditate sunt deserunt accusamus. Ex dolore ducimus,
            dolores earum eius omnis, excepturi aut hic praesentium animi,
            laudantium cum possimus reiciendis quae nesciunt corrupti tempora
            labore et dolorum id? Voluptas, dolore. Itaque sit exercitationem
            consectetur?
          </Text>
        </Box>
      </Grid>
      <Flex display={{ base: 'block', md: 'flex' }} mt="16" justify="flex-end">
        <Button {...styles.buttonContinue} onClick={() => handleTabsChange(2)}>
          Continue
        </Button>
        <Button {...styles.buttonBack} onClick={() => handleTabsChange(0)}>
          Back
        </Button>
      </Flex>
    </div>
  );
}

export default PaymentInfo;
