import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar las pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PromocionesScreen from './screens/PromocionesScreen';
import RegistarClienteScreen from './screens/RegistarClienteScreen';
import PromocionFormScreen from './screens/PromocionFormScreen'; // Pantalla para agregar o editar promociones
import RegistrarMeseroScreen from './screens/RegistrarMeseroScreen'; // Pantalla para registrar meseros

// Configuración de navegadores
const Stack = createStackNavigator();
const AdminStack = createStackNavigator();
const MeseroStack = createStackNavigator();

// Navegador para administradores
const AdminDashboard = ({ route }) => {
    const { role } = route.params || {}; // Recibe el rol desde LoginScreen

    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="Promociones"
                component={PromocionesScreen}
                initialParams={{ role }} // Pasar el rol a la pantalla de promociones
                options={{headerShown: false}}
            />
            <AdminStack.Screen name="Agregar Promoción" component={PromocionFormScreen} />
            <AdminStack.Screen name="Registrar Cliente" component={RegistarClienteScreen} />
            <AdminStack.Screen name="Registrar Mesero" component={RegistrarMeseroScreen} />
            <AdminStack.Screen name="Editar Promoción" component={PromocionFormScreen} />
        </AdminStack.Navigator>
    );
};

// Navegador para meseros
const MeseroDashboard = ({ route }) => {
    const { role } = route.params || {}; // Recibe el rol desde LoginScreen

    return (
        <MeseroStack.Navigator>
            <MeseroStack.Screen
                name="Promociones"
                component={PromocionesScreen}
                initialParams={{ role }} // Pasar el rol a la pantalla de promociones
                options={{headerShown: false}}
            />
            <MeseroStack.Screen name="Registrar Cliente" component={RegistarClienteScreen} />
        </MeseroStack.Navigator>
    );
};

// Navegador principal
const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name="Registro" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="MeseroDashboard" component={MeseroDashboard} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;