import { useNavigation } from "@react-navigation/native";

const useNavigate = () => {
    const navigation = useNavigation();
        return (screen) => {
            navigation.navigate(screen);
          };
  };


export default useNavigate;