import Toast from 'react-native-toast-message'

const ShowToastSucceed = () => {
  console.log('OOK')
  Toast.show({
    type: 'info',
    text1: 'This is an info message',
  })
}
const ShowToastError = () => {
  console.log('OOK')
  Toast.show({
    type: 'info',
    text1: 'This is an info message',
  })
}
export { ShowToastSucceed, ShowToastError }
