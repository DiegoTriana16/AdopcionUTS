import { View } from 'react-native'
import React, { useState} from 'react'
import { ListItem, Icon, Text } from "react-native-elements"
import { map, set } from "lodash"
import { Modal } from "../../components"
import { ChangeDisplayName } from "./changeDisplayName"
import { ChangePassword } from './ChangePassword/ChangePassword' 

export function AccountOptions() {
    
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setrenderComponent] = useState(null);
    

    const onCloseOpenModal = () => setShowModal( (prevState)=> !prevState);

    const selectedComponent = (key) => {
        if (key === "displayName") {
            setrenderComponent(<ChangeDisplayName onClose={onCloseOpenModal} />);
        }
        if (key === "email") {
            setrenderComponent(<Text>Cambiar email</Text>);
        }
        if (key === "password") {
            setrenderComponent(<ChangePassword onClose={onCloseOpenModal}/>);
        }

        onCloseOpenModal();
    };
    
    const menuOptions = getMenuOptions(selectedComponent);

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem key={index} bottomDivider onPress={menu.onPress}>
                    <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />

                </ListItem>
            ))}

            <Modal show={showModal} close= {onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

function getMenuOptions(selectedComponent) {
    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent("displayName") 
        },
       /* {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent("email")
        },*/
        {
            title: "Cambiar Contrasena",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent("password")
        }
    ]
}