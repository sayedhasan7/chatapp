import { useState } from 'react';

const useSignUpValidation = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: ""
    });

    const handleChange = (fieldName, value) => {
        setValues({
            ...values,
            [fieldName]: value
        });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!values.name || values.name.length < 5) {
            newErrors.name = values.name ? "Name must be at least 5 characters long" : "Name cannot be empty";
            isValid = false;
        } else {
            newErrors.name = "";
        }

        if (!values.email || !validateEmail(values.email)) {
            newErrors.email = values.email ? "Please enter a valid email address" : "Email cannot be empty";
            isValid = false;
        } else {
            newErrors.email = "";
        }

        if (!values.password || !validatePassword(values.password)) {
            newErrors.password = values.password ? "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long" : "Password cannot be empty";
            isValid = false;
        } else {
            newErrors.password = "";
        }

        if (!values.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password cannot be empty";
            isValid = false;
        } else if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        } else {
            newErrors.confirmPassword = "";
        }

        if (!values.mobileNumber) {
            newErrors.mobileNumber = "Mobile Number cannot be empty";
            isValid = false;
        } else if (values.mobileNumber.length !== 10) {
            newErrors.mobileNumber = "Please enter a 10-digit mobile number";
            isValid = false;
        } else {
            newErrors.mobileNumber = "";
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Regular expression for password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return passwordRegex.test(password);
    };

    return {
        values,
        errors,
        handleChange,
        validate
    };
};

export default useSignUpValidation;
