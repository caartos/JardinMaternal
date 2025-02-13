import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Main from './src/Main'
import Register from './src/Register'
import ForgotPassword from './src/ForgotPassword'
import LoggedMenu from './src/LoggedMenu'
import Profile from './src/Profile'
import CreateChildProfile from './src/CreateChildProfile'
import ChildMenu from './src/ChildMenu'
import ChildProfile from './src/ChildProfile'

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>   
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}} />
            <Stack.Screen name="LoggedMenu" component={LoggedMenu} options={{headerShown: false}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="CreateChildProfile" component={CreateChildProfile} options={{headerShown: false}}/>
            <Stack.Screen name="ChildMenu" component={ChildMenu} options={{headerShown: false}}/>
            <Stack.Screen name="ChildProfile" component={ChildProfile} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator