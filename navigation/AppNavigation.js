import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocPermissions from "../screens/LocPermissions";
import MapComponent from "../screens/map";
import PullUpPanel from "../screens/teste";
const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='PullUpPane'> 
                <Stack.Screen name="Map" options={{ headerShown: false }} component={MapComponent} />
                 <Stack.Screen name="LocPermissions" options={{ headerShown: false }} component={LocPermissions} />
                 <Stack.Screen name="PullUpPane" options={{ headerShown: false }} component={PullUpPanel} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}