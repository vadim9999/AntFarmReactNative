import React from 'react';
import { Center, Text, VStack } from 'native-base';

class AboutApplication extends React.Component {
  render() {
    return (
      <Center mt="10">
        <VStack width="95%">
          <Text>Дипломна робота</Text>
          <Text>
            Тема: Розробка програмного забезпечення для моніторингу та
            управління мурашиною фермою
          </Text>
          <Text>Виконав студент групи 121-19зск-1 Путров Вадим Дмитрович</Text>
          <Text>Керівник дипломного проекту Приходченко Сергій Дмитрович</Text>
        </VStack>
      </Center>
    );
  }
}

export default AboutApplication;
