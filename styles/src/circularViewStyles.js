import { StyleSheet } from "react-native";

const circularViewStyles = StyleSheet.create({
    container: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    height: "58%",
  },circularItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },circularItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  highlightedCircular: {
    backgroundColor: "#d1e7dd", // Fondo diferente para las circulares más recientes
  },
  showMoreText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#e8aca0",
    fontWeight: "bold",
  },
})
export default circularViewStyles;