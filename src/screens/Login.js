import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [visible, setvisible] = useState(false)

    const handleOnChange = (field, text) => {
        setValues({ ...values, [field]: text });
        setErrors({ ...errors, [field]: "" })
    };

    const validate = () => {
        let isValid = true;

        if (values.email.trim() === '') {
            setErrors({ ...errors, email: 'Email cannot be empty' });
            isValid = false;
        } else if (!validateEmail(values.email)) {
            setErrors({ ...errors, email: 'Invalid email format' });
            isValid = false;
        }

        if (values.password.trim() === '') {
            setErrors({ ...errors, password: 'Password cannot be empty' });
            isValid = false;
        } else if (values.password.length < 8 || !validatePassword(values.password)) {
            setErrors({ ...errors, password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one number' });
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = () => {
        setvisible(true)
        firestore()
            .collection('users')
            .where('email', '==', values.email)
            .get()
            .then(async (res) => {
                const { email, password, name, userId,mobilenumber } = res.docs[0].data();
                if (password === values.password) {
                    setvisible(false)
                    await AsyncStorage.setItem("NAME", name)
                    await AsyncStorage.setItem("EMAIL", email)
                    await AsyncStorage.setItem("USERID", userId)
                    await AsyncStorage.setItem("PASSWORD", password)
                    await AsyncStorage.setItem("MOBILENO", mobilenumber)
                    navigation.navigate('Home');
                } else {
                    setErrors({ ...errors, password: 'Incorrect Password' });
                }
            })
            .catch((err) => {
                console.log(err)
                setvisible(false)
                setErrors({ ...errors, email: 'User not found' });
            });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                value={values.email}
                onChangeText={(text) => handleOnChange('email', text)}
                style={[styles.input, { marginTop: 50 }]}
                placeholder="Enter Your Email"
            />
            {errors.email !== '' && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
                value={values.password}
                onChangeText={(text) => handleOnChange('password', text)}
                style={[styles.input, { marginTop: 20 }]}
                placeholder="Enter Your Password"
                secureTextEntry
            />
            {errors.password !== '' && <Text style={styles.error}>{errors.password}</Text>}
            <TouchableOpacity onPress={() => { if (validate()) { handleLogin(); } }} style={styles.btn}>
                <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>
            <View style={styles.signupview}>
                <Text>Don't Have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signuptext}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Loader visible={visible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 100
    },
    title: {
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    btn: {
        height: 50,
        borderRadius: 10,
        backgroundColor: 'purple',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    signupview: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signuptext: {
        paddingLeft: 10,
        color: 'dodgerblue'
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5
    }
});

export default Login;
