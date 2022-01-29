import { Toast } from 'native-base';

export const errorToast = (error: any) => {
  Toast.show({
    title: error.message ?? 'Помилка',
    status: 'error',
  });
  // eslint-disable-next-line no-console
  console.log('Error:', error.message);
};
