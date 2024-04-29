import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignUpScreen() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    occupation: "",
  });
  
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateForm = () => {
    let errors = {};
  
    // Check if any field is empty
    if (!userData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!userData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!userData.age.trim()) {
      errors.age = "Age is required";
    }
    if (!userData.occupation.trim()) {
      errors.occupation = "Occupation is required";
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      // Navigate to the next screen (EmailScreen) with user data
      navigation.navigate('EmailScreen', { userData });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.mainHeading}>Sign Up</Text>
      <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 20 }}>Please sign up to enjoy all PFT features</Text>
      
      <Text style={styles.labeltext}>First Name</Text>
      <TextInput value={userData.firstName} onChangeText={(text) => setUserData({ ...userData, firstName: text })} style={styles.textInput} />
      {errors.firstName && <Text style={styles.errorMessage}>{errors.firstName}</Text>}

      <Text style={styles.labeltext}>Last Name</Text>
      <TextInput value={userData.lastName} onChangeText={(text) => setUserData({ ...userData, lastName: text })} style={styles.textInput} />
      {errors.lastName && <Text style={styles.errorMessage}>{errors.lastName}</Text>}

      <Text style={styles.labeltext}>Age</Text>
      <TextInput value={userData.age} onChangeText={(text) => setUserData({ ...userData, age: text })} style={styles.textInput} keyboardType="numeric" />
      {errors.age && <Text style={styles.errorMessage}>{errors.age}</Text>}

      <Text style={styles.labeltext}>Occupation</Text>
      <TextInput value={userData.occupation} onChangeText={(text) => setUserData({ ...userData, occupation: text })} style={styles.textInput} />
      {errors.occupation && <Text style={styles.errorMessage}>{errors.occupation}</Text>}

      <Button title='Next' onPress={handleNext} />
      <Text style={{ fontSize: 16, paddingTop: 10 }} onPress={() => { navigation.navigate('SignIn') }}>Already have an account? Sign In</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainHeading: {
    textAlign: "left",
    fontSize: 30,
    color: "#2c3e5",
    fontWeight: "600"
  },
  labeltext: {
    fontSize: 20,
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
