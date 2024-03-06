import * as Yup from 'yup'

export function initialValues() {
    return {
        nombreApellido: '',
        cedula: '',
        direccion: '',
        celular: '',
        email: '',
        profesion: '',
        motivoAdopcion: '',
        mudanza: '',
        quePasoConMascotasAnteriores: '',
        tieneOtrasMascotas: '',
        lugarDormirMascota: '',
        queHacesConMascotasEnViaje: '',
        observaciones: '',
        recomendaciones: '',
        vivesCasaApartamento: "Casa",
        permitenMascotas: false,
        familiarAlergico: false,
        experienciasMascotas: false,
    };
}

export function validationSchema() {
    return Yup.object({
        nombreApellido: Yup.string(),
        celular: Yup.string(),
        direccion: Yup.string(),
        cedula: Yup.string()
    });
}