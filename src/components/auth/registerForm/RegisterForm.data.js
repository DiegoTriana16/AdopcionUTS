import * as Yup from 'yup'

export function initialValues() {
    return {
        nombre:"",
        telefono:"",
        email:"",
        password:"",
        repeatPassword:"",
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
        password: Yup.string().required("La contraseña es obligatorio"),
        repeatPassword: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("password")], "Las contraseñas tiene que ser iguales"),

    });
}