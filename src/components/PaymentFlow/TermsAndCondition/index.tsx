import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react"

type PropsMap = Readonly <{
  isMarkerShown: boolean,
}>

const MyMapComponent = withScriptjs(withGoogleMap((props: PropsMap) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))


type Props = {
  handleTabsChange: (index: number) => void
}

function PaymentInfo (props: Props) {

  const {handleTabsChange} = props

  return (
    <div>
      <Grid display={{base: 'block', lg: 'grid'}} templateColumns="repeat(2, 1fr)" gap={14}>
        <Box w="100%" mt="12">
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqIqVsu6I5mnrFW4AJMxFkboagehvMovM&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Box>
        <Box w="100%">
          <Heading as="h1" mt="12" textAlign="center">Terms and Conditions</Heading>
          <Heading size="lg" mt="12" textAlign="center">Welcome to EMC Music App</Heading>
          <Text mt="8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum soluta incidunt in quod fuga tempore aspernatur error deleniti impedit perferendis ex, sed quas rem qui consequuntur molestiae laudantium necessitatibus maiores?
            Eius, quaerat nostrum ea accusamus reiciendis, quas nulla minus error dolorum voluptatum hic quasi quod consequatur sint voluptas deserunt totam! Culpa, pariatur sed? Nihil ea labore, facilis minus voluptatibus laboriosam.
          </Text>
          <Text mt="8">
            Eligendi optio deleniti nesciunt cum perspiciatis, sequi quasi quos aspernatur doloremque! Labore, suscipit voluptas quo quae aut exercitationem totam quasi magni eligendi sint perferendis quisquam dignissimos atque quis est omnis.
            Illum ducimus nobis hic aut, ullam quibusdam beatae labore cum doloribus soluta aliquid, est laudantium deleniti pariatur harum! Natus fugiat velit accusantium distinctio necessitatibus neque non minus nulla magni minima.
          </Text>
          <Text mt="8">
            Sint nemo molestiae id aperiam incidunt minus nesciunt quidem non possimus voluptatibus quam enim placeat nam explicabo, aliquid eos quaerat. Impedit magnam voluptate neque quidem aliquid mollitia recusandae. Praesentium, amet.
            Aspernatur suscipit placeat aut ad ullam temporibus, aperiam ipsa. Id ipsam, unde iusto perspiciatis culpa illo obcaecati fuga officia harum ab, ullam blanditiis dolorum quod sapiente cupiditate sunt deserunt accusamus.
            Ex dolore ducimus, dolores earum eius omnis, excepturi aut hic praesentium animi, laudantium cum possimus reiciendis quae nesciunt corrupti tempora labore et dolorum id? Voluptas, dolore. Itaque sit exercitationem consectetur?
            </Text>
        </Box>
      </Grid>
      <Flex display={{base:"block", md: 'flex' }} mt="16" justify="flex-end">
        <Button
          colorScheme="orange"
          mb={{base:"24px", lg: '0' }}
          onClick={() => handleTabsChange(2)}
          order={2}
          w={{ base: '100%', md: '30%', lg: 'auto' }}
        >
          Continue
        </Button>
        <Button
          colorScheme="orange"
          mr="8"
          onClick={() => handleTabsChange(0)}
          order={1}
          w={{ base: '100%', md: '30%', lg: 'auto' }}
        >
          Back
        </Button>
      </Flex>
    </div>
  )
}

export default PaymentInfo