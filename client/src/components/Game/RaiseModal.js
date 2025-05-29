/**
 * Componente RaiseModal:
 * ----------------------
 * Este componente renderiza un botón "Raise" que abre un modal usando Chakra UI.
 * Dentro del modal se muestra un formulario construido con Formik y validado con Yup:
 *  - initialValues.raise: valor inicial redondeado a la décima más cercana basado en props.minRaise.
 *  - validationSchema: 
 *      • Debe ser un número y estar presente.
 *      • Máximo menor que props.maxRaise (muestra chips restantes).
 *      • Mínimo mayor que props.minRaise.
 * Al enviar el formulario:
 *  1. Se llama a props.raiseHandler con el valor introducido.
 *  2. Se desactiva el estado de "submitting".
 *  3. Se cierra el modal.
 *
 * Uso de hooks:
 *  - useDisclosure: controla apertura y cierre del Modal.
 *
 * Props esperadas:
 *  - minRaise (número): cantidad mínima permitida para subir.
 *  - maxRaise (número): cantidad máxima permitida (chips restantes).
 *  - raiseHandler (función): función asíncrona que procesa la subida.
 *  - isDisabled (booleano): deshabilita el botón de envío.
 *  - Cualquier otra prop que se pase al botón principal.
 */

import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomInputField from '../utils/CustomInputField'
import {
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Spacer,
    useDisclosure
} from '@chakra-ui/react'

export default function RaiseModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialValues = {
        raise: Math.round(10 * (props.minRaise + 10))/10, // rounding to the next tenth
    }

    const validationSchema = Yup.object().shape({
        raise: Yup
                .number()
                .typeError('Invalid Amount')
                .required('Required')
                .lessThan(props.maxRaise, `Not enough chips, remaining: ${props.maxRaise}`)
                .min(props.minRaise + 1, `Has to be more than ${props.minRaise}`)
    })

    return (
        <>
        <Button 
            {...props} 
            onClick={onOpen}
            variant="solid"
            border="2px solid black"
            size="md"
            w="10rem"
        >Raise</Button>
        <Modal motionPreset="slideInBottom" isOpen={isOpen} isCentered
            onClose={() => {
                onClose()
            }}
        >
            <ModalOverlay/>
            <ModalContent fontFamily="Ubuntu Mono" className="noselect" width="20rem" >
            <ModalCloseButton/>
            <ModalHeader align="center" justify="center" >Raise</ModalHeader>
            <ModalBody align="center" justify="center">
                <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={async (values, actions) => {
                    await props.raiseHandler(values.raise)
                    actions.setSubmitting(false)
                    onClose()
                }}    
            >
                {({ errors, touched, isSubmitting, isValid }) => (
                <Form>
                    <HStack h="fit-content" align="flex-start">
                        <CustomInputField name="raise" error={errors.raise} touched={touched.raise}/>
                        <Spacer/>
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid || props.isDisabled} 
                            type="submit"
                            colorScheme="facebook"
                            size="lg"
                            variant="solid"
                        >Raise</Button>
                    </HStack>
                </Form>
                )}
            </Formik>
            <ModalFooter/>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}
