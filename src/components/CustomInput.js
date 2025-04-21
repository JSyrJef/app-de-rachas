import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  showToggle,
  onTogglePress,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {showToggle && (
        <TouchableOpacity onPress={onTogglePress} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{secureTextEntry ? "👁️" : "🚫"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    paddingRight: 40,
  },
  toggleBtn: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  toggleText: {
    color: "#aaa",
    fontSize: 18,
  },
});

export default CustomInput;