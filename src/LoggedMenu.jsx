import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import LoggedInHeader from "../components/Headers/LoggedInHeader";

const LoggedMenu = () => {
  //const user = useSelector((state) => state.user.user);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <LoggedInHeader title={"asdfasdf"}/>
          <Text>LoggedMenu</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedMenu;
