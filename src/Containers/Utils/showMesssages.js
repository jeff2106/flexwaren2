import Toast from 'react-native-toast-notifications'

export function ShowSucceed(messages) {
    Toast.show(messages, {
    type: 'success',
    placement: 'top',
    duration: 4000,
    offset: 30,
    animationType: 'zoom-in',
  })
}
function ShowAlert(messages) {
    Toast.show(messages, {
    type: 'warning',
    placement: 'top ',
    duration: 4000,
    offset: 30,
    animationType: 'zoom-in',
  })
}

export default {
  ShowSucceed,
  ShowAlert,
}
