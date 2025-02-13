import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ChildHeader from "../components/Headers/ChildHeader";

const ChildMenu = ({ route }) => {
  const { childName } = route.params;
  console.log(childName);
  return (
    <SafeAreaView>
      <ScrollView>
        <ChildHeader childName={childName} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildMenu;
