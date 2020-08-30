import React, { Fragment, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Theme from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, onSignupOtpPressed, signupSelector } from '../../../redux/slices/signupSlice'
import PageSpinner from '../../../components/common/PageSpinner';
import * as yup from 'yup'
import { Formik } from 'formik'
import { loadUserInfo } from '../../../redux/slices/loginSlice'
import OTPTextView from 'react-native-otp-textinput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function signupOtpPage({ navigation }) {
    const dispatch = useDispatch()
    const { loading, signupOtpError, signupFormObj } = useSelector(signupSelector)
    const [resendtimer, setResendtimer] = React.useState(5);

    useEffect(() => {
        let interval = null;
        if (resendtimer !== 0) {
            interval = setInterval(() => {
                setResendtimer(resendtimer => resendtimer - 1);
            }, 1000);
        } else if (!resendtimer) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [resendtimer]);


    const headerComponent = () => {
        return (
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 35,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons
                        name={"keyboard-backspace"}
                        size={27}
                        color={"grey"}
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: "flex-end", flex: 0.9, marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: "grey", letterSpacing: 1, textAlign: "center" }}>Veirfy Account</Text>
                </View>
            </View>
        )
    }

    const imageContainer = () => {
        return (
            <View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Image
                        style={styles.backgroundImage}
                        resizeMode={'stretch'}
                        source={require('../../../assets/img/otpscreen.png')}
                    />
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 35
                }}>
                    <Text style={{ color: 'gray', fontSize: 15, textAlign: "center", letterSpacing: 0 }} >Please enter the OTP sent to your email {signupFormObj.Email}</Text>
                </View>
            </View>
        )
    }

    const verifyClicked = (values) => {
        if (values.OTP.length == 4)
            dispatch(onSignupOtpPressed(
                {
                    otp: values.OTP,
                    password: signupFormObj.Password,
                    email: signupFormObj.Email,
                    onSuccess: (data) => {
                        dispatch(loadUserInfo(data))
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignupDescPage' }],
                        });
                        // navigation.navigate('Profile');
                    }
                }

            ))
    }

    const footerComponent = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>
                <Text>If you didn't receive a code!</Text>
                {!resendtimer && <Button title="Resend" type="clear" containerStyle={styles.register} onPress={() => console.log("resend")} />}
                {!!resendtimer && <Button title={resendtimer + " secs"} type="clear" containerStyle={styles.register} disabled />}
            </View>
        )
    }

    const inputContainer = () => {
        return (
            <Formik
                initialValues={{ OTP: '' }}
                onSubmit={values => verifyClicked(values)}
                validationSchema={
                    yup.object().shape({
                        OTP: yup
                            .number()
                            .required()
                    })
                } >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                        <View style={styles.inputComponentStyle}>
                            <View style={{ margin: 10, marginBottom: 30 }}>
                                <OTPTextView
                                    tintColor="black"
                                    handleTextChange={(e) => {
                                        handleChange("OTP")(e);
                                        dispatch(clearErrors())
                                    }}
                                    textInputStyle={{ borderBottomWidth: 2 }}
                                    inputCount={4}
                                    keyboardType="numeric"
                                />
                            </View>
                            {!!signupOtpError &&
                                <Text style={{ fontSize: 14, color: 'red', textAlign: "center", marginTop: -15 }}>{signupOtpError}</Text>
                            }
                            {touched.OTP && errors.OTP &&
                                <Text style={{ fontSize: 14, color: 'red', textAlign: "center", marginTop: -15 }}>{errors.OTP}</Text>
                            }
                            <Button title="Verify" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
                        </View>
                    </Fragment>
                )}
            </Formik >
        )
    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {headerComponent()}
                    {imageContainer()}
                    {inputContainer()}
                    {footerComponent()}
                </View>
                <PageSpinner visible={loading} />
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    inputComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    MainContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: "rgb(255, 255, 255)",
    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: Theme.spacing.small,
        width: 150,
        borderRadius: 20,
    },
    backgroundImage: {
        width: 200,
        height: 200,
    },
});