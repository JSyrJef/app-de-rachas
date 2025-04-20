import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { registrarUsuario } from '../services/api'; // Importar función desde api.js

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mesero'); // Valor predeterminado

    const handleRegister = async () => {
        try {
            const response = await registrarUsuario({ username, password, role });
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            navigation.goBack(); // Regresar a la pantalla de login
        } catch (error) {
            Alert.alert(
                'Error',
                error.response?.data?.error || 'No se pudo registrar el usuario.'
            );
            console.error('Error en registro:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />
            <TextInput
                placeholder="Rol (admin o mesero)"
                value={role}
                onChangeText={setRole}
                style={styles.input}
            />
            <Button title="Registrarse" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default RegisterScreen;
