import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocPermissions from "../screens/LocPermissions";
import MapComponent from "../screens/map";
import PullUpPanel from "../screens/teste";
import Initial from "../screens/Initial";
const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='Initial'> 
                <Stack.Screen name="Map" options={{ headerShown: false }} component={MapComponent} />
                 <Stack.Screen name="LocPermissions" options={{ headerShown: false }} component={LocPermissions} />
                
                 <Stack.Screen name="Initial" options={{ headerShown: false }} component={Initial} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}