/**
 * CustomInputField
 *
 * Componente de campo de formulario integrado con Formik y Chakra UI.
 *
 * Props:
 * @param {string} type    - Tipo de input (p.ej. "text", "password", "email").
 * @param {string} label   - Etiqueta que se mostrará encima del input.
 * @param {string} name    - Nombre del campo, utilizado por Formik para el binding.
 * @param {string} error   - Mensaje de error proveniente de Formik/Yup.
 * @param {boolean} touched - Indica si el campo ha sido tocado para mostrar errores.
 *
 * Funcionamiento:
 * - Usa <Field> de Formik para conectar el input al estado del formulario.
 * - Envuelve el input en <FormControl> de Chakra, mostrando errores cuando
 *   `error` y `touched` son truthy.
 * - Renderiza <FormLabel>, <Input> y <FormErrorMessage> automáticamente.
 */
import React from 'react';
import { Field } from 'formik';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input
} from '@chakra-ui/react';

export default function CustomInputField({ type, label, name, error, touched }) {
    return (
        <Field type={type} name={name}>
            {({ field }) => (
                <FormControl isInvalid={error && touched}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Input {...field} type={type} id={name} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
}
