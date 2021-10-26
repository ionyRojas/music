import { useState } from "react"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Grid } from "@chakra-ui/react"
import Summary from "components/Summary"

import CustomerInformation from "./CustomerInformation"
import PaymentSelection from "./PaymentSelection"
import TermsAndCondition from "./TermsAndCondition"

function PaymentFlow () {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<boolean>(false)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }


  return (
    <Grid overflowX="hidden" display={{base:"block", lg: 'grid' }} templateColumns="65% 36%" gap={2}>
      <Box w="100%" padding={{base:"0 20px", lg: '0 40px' }}>
        <Tabs variant="enclosed" colorScheme="messenger" color="white" index={tabIndex} onChange={handleTabsChange}>
          <TabList overflowX={{base: 'auto'}} overflowY="hidden">
            <Tab _selected={{ color: "black", bg: "white" }} >Customer Information</Tab>
            <Tab _selected={{ color: "black", bg: "white" }}  isDisabled={activeTab}>Terms and Conditions</Tab>
            <Tab _selected={{ color: "black", bg: "white" }}  isDisabled={activeTab}>Payment Selection</Tab>
          </TabList>
          <TabPanels>
            <TabPanel width="100%" padding={{md: '12', lg: '0'}} pt={{md: '0', lg: '0'}}>
              <CustomerInformation setActiveTab={setActiveTab} handleTabsChange={handleTabsChange} />
            </TabPanel>
            <TabPanel>
              <TermsAndCondition handleTabsChange={handleTabsChange} />
            </TabPanel>
            <TabPanel width="100%" padding={{md: '12', lg: '0'}} pt={{md: '0', lg: '0'}}>
              <PaymentSelection handleTabsChange={handleTabsChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box
        borderLeftWidth={{base: '0', lg: "2px"}}
        borderTopWidth={{base: '2px', lg: "0"}}
        m={{base: '30px', lg: "0"}}
        minHeight={{base: '0', lg: "550px"}}
        padding={{base:"20px", lg: '0 40px' }}
        w={{lg: '100%'}}
      >
          <Summary tabIndex={tabIndex} />
      </Box>
    </Grid>
  )
}

export default PaymentFlow