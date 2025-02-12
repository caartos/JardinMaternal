import { useNavigation } from "@react-navigation/native";

const useNavigate = () => {
    const navigation = useNavigation();
        return (screen, params = {}) => {
            navigation.navigate(screen, params);
          };
  };


export default useNavigate;