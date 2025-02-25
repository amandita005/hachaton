import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocPermissions from "../screens/LocPermissions";
import MapComponent from "../screens/map";
import PullUpPanel from "../screens/teste";
import Initial from "../screens/Initial";
import AdressScreen from "../screens/AdressScreen";
import Welcome from "../screens/WelcomeScreen";
const Stack = createNativeStackNavigator();
import EmitirAlerta from "../screens/EmitirAlerta";
import FloodAlertScreen from "../screens/FloodAlertScreen";

export default function AppNavigation(){
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='Welcome'>
                 <Stack.Screen name="Map" options={{ headerShown: false }} component={MapComponent} />
                 <Stack.Screen name="FloodAlert" options={{ headerShown: false }} component={FloodAlertScreen} />
                 <Stack.Screen name="EmitirAlerta" options={{ headerShown: false }} component={EmitirAlerta} />
                 <Stack.Screen name="LocPermissions" options={{ headerShown: false }} component={LocPermissions} />
                 <Stack.Screen name="Initial" options={{ headerShown: false }} component={Initial} />
                 <Stack.Screen name="Adress" options={{ headerShown: false }} component={AdressScreen} />
                 <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}