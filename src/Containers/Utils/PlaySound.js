import NotificationSounds, {
  playSampleSound,
} from 'react-native-notification-sounds'

function PlaySound() {
  NotificationSounds.getNotifications('ringtone').then(soundsList => {
    console.warn('SOUNDS', soundsList[7])
    /*
        Play the notification sound.
        pass the complete sound object.
        This function can be used for playing the sample sound
      */
    playSampleSound(soundsList[10])
    // if you want to stop any playing sound just call:
    // stopSampleSound();
  })
}

export default PlaySound
