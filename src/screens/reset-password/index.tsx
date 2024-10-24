/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-dynamic-require */
import {
    Dimensions,
    View,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';
  import * as yup from 'yup';
  import React, {useState} from 'react';
  import SafeAreaScreen from '@/src/components/SafeAreaScreen';
  import {useTheme, Text} from 'react-native-paper';
  import CustomButton from '@/src/components/CustomButton';
  import {Formik} from 'formik';
  import {useTranslation} from 'react-i18next';
  import {useNavigation} from '@react-navigation/native';
  import {RootStackScreenProps} from '@/src/types/navigation';
  import {Colors} from '@/src/config/colors';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  import InputField from '@/src/components/InputField';
  import {useAppDispatch} from '@/src/redux/store';
  import Toast from 'react-native-toast-message';
  import CountryCodeData from '@/src/mocks/country-codes';
  import CountryCodeModal from '@/src/components/modals/CountryCodeModal';
  import {Country} from '@/src/types';
  import {forgotPassword, login} from '@/src/api/auth';
  import Loader from '@/src/components/loader';
  import styles from './styles';
  
 
  type FormValues = {
    email_or_phone: string;
    email_or_phones: string;
    password: string;
  };
  
  type LoginPayload = {
    email_or_phone: string;
    email_or_phones: string;
    password: string;
    email: string;
  };
  
  export default function ResetPassword() {
    const {colors} = useTheme();
    const {top, bottom} = useSafeAreaInsets();
    const {t} = useTranslation('onboarding');
    const navigation = useNavigation<RootStackScreenProps<'Onboard'>['navigation']>();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [isPhoneLogin, setIsPhoneLogin] = useState(false);
    const [countryModalVisible, setCountryModalVisible] = useState(false);
    const [country, setCountry] = useState<Country>(CountryCodeData[0]);
  
    function toggleCountryModal() {
      setCountryModalVisible(!countryModalVisible);
    }
  
    function submit({email}: LoginPayload) {
      setLoading(true);
      dispatch(forgotPassword({email}))
        .unwrap()
        .then(() => {
          setLoading(false);
          navigation.navigate('ValidateOtp', {email:email} );
        })
        .catch(err => {
          setLoading(false);
  
          const errorMessage =
            typeof err?.detail === 'string' ? err.detail : 'An unexpected error occurred';
  
          Toast.show({
            type: 'error',
            props: {message: errorMessage},
          });
        });
    }
  
    const loginValidationSchema = yup.object().shape({
      email: yup.string().email(t('Enter a valid email')).required(t('Email is required')),
    });
  
    return (
      <SafeAreaScreen style={styles.screen}>
        <KeyboardAvoidingView style={styles.fullView} behavior="height">
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <ImageBackground
              resizeMode="cover"
              source={require('@/src/assets/images/logo_1.png')}
              style={styles.imgBackground}
              imageStyle={styles.img}
            />
            <View
              style={[
                {
                  paddingTop: top,
                  paddingBottom: bottom,
                  flexDirection: 'column',
                  gap: 5,
                  display: 'flex',
                  alignItems: 'center',
                },
              ]}>
              <Text variant="titleLarge" style={[{color: 'black'}]}>
                Reset Password
              </Text>
              <Text variant="titleSmall">Your Password must be different from old passwords</Text>

            </View>

  
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: ''}}
              onSubmit={values => submit(values)}>
              {({touched, handleChange, handleSubmit, errors, isValid, values}) => (
                <>
                  <InputField
                    password
                    required
                    label=""
                    // keyboardType="password"
                    error={touched.email && errors.email}
                    errorMessage={errors.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    placeholder={t('New Password', {ns: 'login'})}
                    inputComponentStyle={{backgroundColor: colors.background}}
                  />
  
                  <InputField
                    password
                    required
                    label=""
                    // keyboardType="password"
                    error={touched.email && errors.email}
                    errorMessage={errors.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    placeholder={t('Confirm Password', {ns: 'login'})}
                    inputComponentStyle={{backgroundColor: colors.background}}
                  />
  
                  <CustomButton
                    primary
                    title="Continue"
                    onPress={() => handleSubmit()}
                    style={styles.createBtn}
                    disabled={!isValid}
                  />
                  <CustomButton
                    title="Cancel"
                    onPress={() => navigation.navigate('Authentication')}
                    style={styles.createBtn}
                    disabled={!isValid}
                  />
                
                </>
              )}
            </Formik>
            <CountryCodeModal
              visible={countryModalVisible}
              close={() => toggleCountryModal()}
              setSelected={setCountry}
            />
          </ScrollView>
          <Loader visible={loading} />
        </KeyboardAvoidingView>
      </SafeAreaScreen>
    );
  }
  