import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import useSignUpValidation from '../hooks/useSignUpValidation';

const SignUp = ({ navigation }) => {
    const { values, errors, handleChange, validate } = useSignUpValidation();

    const handleSignUp = () => {
        if (validate()) {
            const userId = uuid.v4();
            const userData = {
                name: values.name,
                email: values.email,
                password: values.password,
                mobilenumber: values.mobileNumber,
                userId: userId
            };

            firestore().collection("users").doc(userId).set(userData)
                .then(() => {
                    console.log("User signed up successfully");
                    navigation.navigate("Login");
                })
                .catch(error => {
                    console.error("Error signing up:", error);
                });
        }
    };

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
                <Text style={styles.title}>SignUp</Text>
                <TextInput value={values.name} onChangeText={(text) => handleChange("name", text)} style={[styles.input, { marginTop: 50 }]} placeholder='Enter Your Name' />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
                <TextInput value={values.email} onChangeText={(text) => handleChange("email", text)} style={[styles.input, { marginTop: 20 }]} placeholder='Enter Your Email' />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <TextInput value={values.mobileNumber} onChangeText={(text) => handleChange("mobileNumber", text)} keyboardType='number-pad' style={[styles.input, { marginTop: 20 }]} placeholder='Enter Your Mobile Number' />
                {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber}</Text>}
                <TextInput value={values.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry={true} style={[styles.input, { marginTop: 20 }]} placeholder='Enter Your Password' />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                <TextInput value={values.confirmPassword} onChangeText={(text) => handleChange("confirmPassword", text)} secureTextEntry={true} style={[styles.input, { marginTop: 20 }]} placeholder='Confirm Password' />
                {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                <TouchableOpacity activeOpacity={0.6} onPress={handleSignUp} style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.loginView}>
                    <Text>Already Have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: 50
    },
    title: {
        fontSize: 30,
        color: "black",
        alignSelf: "center",
        fontWeight: "bold"
    },
    input: {
        height: 50,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    btn: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "purple",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    },
    loginView: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    loginText: {
        paddingLeft: 10,
        color: "dodgerblue"
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5
    }
});

export default SignUp;
