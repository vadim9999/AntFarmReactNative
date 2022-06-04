import React from 'react';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationConfig } from '@react-navigation/drawer/lib/typescript/src/types';

const CustomDrawerContent: DrawerNavigationConfig['drawerContent'] = props => {
  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Мурашина ферма
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <Pressable
            px="5"
            py="3"
            rounded="md"
            bg={
              props.state.index === 0 ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
            }
            onPress={() => {
              props.navigation.navigate('BluetoothSettings');
            }}>
            <HStack space="7" alignItems="center">
              <Icon
                color="gray.500"
                size="5"
                as={<MaterialCommunityIcons name="bluetooth-settings" />}
              />
              <Text fontWeight="500" color="dark.100">
                Налаштування Bluetooth
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            px="5"
            py="3"
            rounded="md"
            bg={
              props.state.index === 1 ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
            }
            onPress={() => {
              props.navigation.navigate('WifiSettings');
            }}>
            <HStack space="7" alignItems="center">
              <Icon
                color="gray.500"
                size="5"
                as={<MaterialCommunityIcons name="wifi" />}
              />
              <Text fontWeight="500" color="dark.100">
                Налаштування WiFi
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            px="5"
            py="3"
            rounded="md"
            bg={
              props.state.index === 2 ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
            }
            onPress={() => {
              props.navigation.navigate('AboutApp');
            }}>
            <HStack space="7" alignItems="center">
              <Icon
                color="gray.500"
                size="5"
                as={<MaterialCommunityIcons name="information" />}
              />
              <Text fontWeight="500" color="dark.100">
                Про додаток
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
