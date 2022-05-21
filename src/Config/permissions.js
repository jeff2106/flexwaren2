import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then((statuses) => {
  console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
  console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
});

