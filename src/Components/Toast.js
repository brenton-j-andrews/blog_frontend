import React from 'react';
import Toast from "react-bootstrap/Toast";


const BasicToast = (props) => {

    const closeToast = () => {
        props.setShowToast(false);
    }

    return (
        <Toast 
        onClose={closeToast}
        bg="success"
        hidden={props.showToast ? false : true
        }>
            <Toast.Header> <strong> BootStrap Test... </strong> </Toast.Header>

            <Toast.Body> {props.toastText} </Toast.Body>

        </Toast>
    
    )
    
}

export default BasicToast;