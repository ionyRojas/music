import { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Grid,
} from '@chakra-ui/react';
import Summary from 'components/Summary';

import CustomerInformation from './CustomerInformation';
import PaymentSelection from './PaymentSelection';
import TermsAndCondition from './TermsAndCondition';
import * as styles from './styles';

function PaymentFlow() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<boolean>(true);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Grid {...styles.grid} overflowX="hidden">
      <Box w="100%" padding={{ base: '0 20px', lg: '0 40px' }}>
        <Tabs
          variant="enclosed"
          colorScheme="messenger"
          color="white"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList overflowX={{ base: 'auto' }} overflowY="hidden">
            <Tab _selected={{ color: 'black', bg: 'white' }}>
              Customer Information
            </Tab>
            <Tab
              _selected={{ color: 'black', bg: 'white' }}
              isDisabled={activeTab}
            >
              Terms and Conditions
            </Tab>
            <Tab
              _selected={{ color: 'black', bg: 'white' }}
              isDisabled={activeTab}
            >
              Payment Selection
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel {...styles.tabPanel}>
              <CustomerInformation
                setActiveTab={setActiveTab}
                handleTabsChange={handleTabsChange}
              />
            </TabPanel>
            <TabPanel>
              <TermsAndCondition handleTabsChange={handleTabsChange} />
            </TabPanel>
            <TabPanel {...styles.tabPanel}>
              <PaymentSelection handleTabsChange={handleTabsChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box {...styles.summaryBox}>
        <Summary tabIndex={tabIndex} />
      </Box>
    </Grid>
  );
}

export default PaymentFlow;
