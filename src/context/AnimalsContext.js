import { createContext, useContext, useState } from "react";

const AnimalsContext = createContext();

export default function AnimalsProvider({children}) {
  const [isData, setIsData] = useState(false);

  const updateData = (data) => {
    setIsData(data);
  };

  const resetData = () =>{
    setIsData(false);
  }

  return (
    <AnimalsContext.Provider
      value={{
        updateData,
        isData,
        resetData
      }}
    >
      {children}
    </AnimalsContext.Provider>
  );
}


export function useAnimalsContext(){
    return useContext(AnimalsContext)
}