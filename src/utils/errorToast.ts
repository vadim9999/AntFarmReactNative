import { Toast } from 'native-base';

export const errorToast = (error: any) => {
  Toast.show({
    title: error.message,
    status: 'error',
  });
  // eslint-disable-next-line no-console
  console.log(error.message);
};
