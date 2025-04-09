import React from 'react';
import * as Icons from 'react-icons/fa6'

const DynamicIcon = ({name, size=20}) => {

    const IconComponent = Icons[name]

    if(!IconComponent){
        return <span>Ícone não encontrado!</span>
    }

    return <IconComponent color={name == "FaCircleXmark" ? "red" : "green"} size={size} />
}

export default DynamicIcon;