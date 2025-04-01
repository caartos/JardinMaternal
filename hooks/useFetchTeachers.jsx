import { useEffect, useState } from "react";
import { fetchTeachers } from "../config/db/users/users";

const useFetchTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama a fetchTeachers y pasa los callbacks para manejar los datos y errores
    const unsubscribe = fetchTeachers(
      (fetchedTeachers) => setTeachers(fetchedTeachers), // Callback para actualizar el estado
      (err) => setError(err) // Callback para manejar errores
    );

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return { teachers, error };
};

export default useFetchTeachers;