import * as Yup from "yup";

export function initialValues() {
  return {
    displayName: "",
    nombre: "",
    telefono: "",
    email: "",
    cedula: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string(),
      //.required("El nombre y apellidos son requeridos"),
    cedula: Yup.string()
      .matches(/^[0-9]+$/, "La cédula solo debe contener números"),
      //.required("La cédula es obligatoria"),
    telefono: Yup.string()
      .matches(/^[0-9]+$/, "La cédula solo debe contener números"),
      //.required("La cédula es obligatoria")
  });
}