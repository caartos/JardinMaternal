import { View } from "react-native";
import AppNavigator from "./AppNavigator";
import "../../Proyecto Jardin/JardinMaternal/config/firebaseConfig";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </Provider>
  );
}
