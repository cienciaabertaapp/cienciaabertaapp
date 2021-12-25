import React, {createContext, useState} from "react";


export const MyAdmin = createContext({});

const RulesAdmin = ({ rules }) => {
    const [tipoUsuario, setTipoUsuario] = useState()([
        {admin:true},
    ]);
    return (
        <MyAdmin.Provider value={tipoUsuario}>
            {rules}
        </MyAdmin.Provider>
    )
}
export default RulesAdmin;