import * as Yup from 'yup'

export function initialValues() {
    return {
        observaciones: '',
        recomendaciones: '',
        estado: 'en estudio',
    };
}

export function validationSchema() {
    return Yup.object({
        observaciones: Yup.string().required('Las observaciones son obligatorias'),
        recomendaciones: Yup.string().required('Las recomendaciones son obligatorias'),
        estado: Yup.string(),

    });
}