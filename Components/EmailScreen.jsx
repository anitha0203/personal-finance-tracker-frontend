import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EmailScreen({ route }) {
  const { userData } = route.params;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();

  const handleGenerateOTP = () => {
    // Send email to backend to get OTP
    console.log(email);
    axios.post('http://192.168.0.118:8083/v1/pft/emailVerification?email='+ email )
      .then(response => {
        console.log('OTP sent successfully', email);
        console.log(response.data);
        // Handle OTP response
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
      });
  };

  const handleVerifyOTP = () => {
    // Verify OTP by sending email, pin, and OTP to backend
    axios.post('http://192.168.0.118:8083/v1/pft/verifyOTP?email=' +email + '&otp=' + otp )
      .then(response => {
        console.log('OTP verified successfully');
        console.log(response.data);
        // If OTP verification successful, send all user data to backend
        axios.post('http://192.168.0.118:8083/v1/pft/register', { ...userData, email })
          .then(response => {
            console.log('User registered successfully');
            console.log(response.data);
            // Reset fields and navigate to success screen
            setEmail("");
            setOtp("");
            navigation.navigate('DashboardScreen');
          })
          .catch(error => {
            console.error('Error registering user:', error);
          });
      })
      .catch(error => {
        console.error('Error verifying OTP:', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.mainHeading}>Verify your E-mail Address</Text>
      
      <Text style={styles.labeltext}>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.textInput} />

      <Text style={styles.labeltext}>OTP</Text>
      <TextInput value={otp} onChangeText={setOtp} style={styles.textInput} />

      <Button title='Generate OTP' onPress={handleGenerateOTP} />
      <Button title='Verify OTP' onPress={handleVerifyOTP} />
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
});
