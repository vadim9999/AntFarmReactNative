import { Box, Flex, Spinner as SpinnerNB } from 'native-base';
import React from 'react';
import styles from './styles';

const Spinner = () => {
  return (
    <Box style={styles.spinnerContainer}>
      <Flex flex={1} justifyContent="center">
        <SpinnerNB size="lg" />
      </Flex>
    </Box>
  );
};

export default Spinner;
