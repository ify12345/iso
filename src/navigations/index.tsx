import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Onboarding screens

// Authenticated Screen

// import {useAppSelector} from '~redux/store';
import Onboarding from '../screens/onboard';
import {RootStackParamList} from '../types/navigation';
import AuthScreens from '../screens/auth';
import ForgotPassword from '../screens/forgot-password';
import AccountVerification from '../screens/verification';
import ResetPassword from '../screens/reset-password';
import VerificationSuccess from '../screens/verification-succes';
import BottomTab from './bottomTab';
import EditBasicInfo from '../screens/edit-basic';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // const [loading, setLoading] = useState(true)
  // const {isAuthenticated, isVerified, user} = useAppSelector(store => store.auth);
  // const userRole = user.user?.user_type;
  // console.log(userRole);

  // console.log({isAuthenticated, isVerified})

  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   (async () => {
  //     const checkCredential = await credentials();
  //     if (!checkCredential) {
  //       setLoading(false)
  //       dispatch(logout())
  //     }
  //   })()
  // }, [])

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getUser())
  //     .unwrap()
  //     .then(() => {
  //       setLoading(false)
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //       dispatch(logout())
  //     })
  //   } else {
  //     setLoading(false)
  //     dispatch(logout())
  //   }
  // }, [isAuthenticated])

  // if (loading) {
  //   return null
  // }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Group>
        <RootStack.Screen name="HomeTab" component={Onboarding} />
        <RootStack.Screen name="Authentication" component={AuthScreens} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="ValidateOtp" component={AccountVerification} />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} />
        <RootStack.Screen name="VerificationSuccess" component={VerificationSuccess} />
        <RootStack.Screen name="BottomTab" component={BottomTab} />
        <RootStack.Screen name="EditBasicInfo" component={EditBasicInfo} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}