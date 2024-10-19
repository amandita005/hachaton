import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocPermissions from "../screens/LocPermissions";

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='LocPermissions'> 
                 <Stack.Screen name="LocPermissions" options={{ headerShown: false }} component={LocPermissions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}