import * as Yup from 'yup'

export function initialValues() {
    return {
        observaciones: '',
        recomendaciones: '',
        estado:'',
    };
}

export function validationSchema() {
    return Yup.object({
        observaciones: Yup.string(),
        recomendaciones: Yup.string(),
        estado: Yup.string(),
        
    });
}