import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/Main";
import Register from "./src/Register";
import ForgotPassword from "./src/ForgotPassword";
import LoggedMenu from "./src/LoggedMenu";
import Profile from "./src/Profile";
import CreateChildProfile from "./src/CreateChildProfile";
import ChildMenu from "./src/ChildMenu";
import ChildProfile from "./src/ChildProfile";
import ChatScreen from "./src/ChatScreen";
import AdminMenu from "./src/Admin/AdminMenu";
import CreateCircular from "./src/Admin/CreateCircular";
import AllCirculars from "./src/Admin/AllCirculars";
import GenerateCode from "./src/Admin/GenerateCode";
import RoomAndChild from "./src/Admin/RoomAndChild";
import CreateRoom from "./src/Admin/CreateRoom";
import Room from "./src/Admin/Room";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoggedMenu"
          component={LoggedMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateChildProfile"
          component={CreateChildProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChildMenu"
          component={ChildMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChildProfile"
          component={ChildProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMenu"
          component={AdminMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateCircular"
          component={CreateCircular}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllCirculars"
          component={AllCirculars}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenerateCode"
          component={GenerateCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomAndChild"
          component={RoomAndChild}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateRoom"
          component={CreateRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
