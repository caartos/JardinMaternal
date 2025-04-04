import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import TeachersView from "../../components/View/TeachersView";

const Teachers = () => {

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Maestros"} backButtonDestiny={"AdminMenu"} />
        <TeachersView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teachers;
