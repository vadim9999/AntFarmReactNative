import { Toast } from 'native-base';

export const errorToast = (error: any) => {
  Toast.show({
    title: error.message ?? 'Unknown error',
    status: 'error',
  });
  // eslint-disable-next-line no-console
  console.log('Error:', error.message);
};
