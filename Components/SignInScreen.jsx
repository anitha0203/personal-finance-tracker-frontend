import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateForm = () => {
    let errors = {};
    if (!email) errors.email = "Email is required";
    else if (email.indexOf("@") == -1 || email.lastIndexOf(".") == -1) errors.email = "Invalid Email format"

    if (!pin) errors.pin = "Pin is required";
    else if (pin.length < 4) errors.pin = "Pin must be 4 characters long";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(email, pin);
      setEmail("")
      setPin("")
      setErrors({})
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.mainHeading}>Login</Text>
      <Text style={{ fontSize: 16, paddingTop: 10 }}>Please log in to enjoy all PFT features</Text>
      <Text style={styles.labeltext}>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.textInput} />
      {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

      <Text style={styles.labeltext}>Pin</Text>
      <TextInput value={pin} onChangeText={setPin} secureTextEntry style={styles.textInput} />
      {errors.pin && <Text style={styles.errorMessage}>{errors.pin}</Text>}

      <Button title='Login' onPress={handleSubmit} />
      <Text style={{ fontSize: 16, paddingTop: 10 }} onPress={() => { navigation.navigate('SignUp') }}>If you don't have an account, Sign Up</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: "20%",
  },
  mainHeading: {
    textAlign: "left",
    fontSize: 30,
    color: "#2c3e5",
    fontWeight: "600"
  },
  labeltext: {
    fontSize: 20,
    marginTop: "10%"
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee"
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  }
});
