/**
 * Modal para ingresar un código de sala y unirse a la partida
 *
 * Este componente muestra un botón “Room Code” que, al pulsarlo, abre un modal
 * con un formulario gestionado por Formik y validado con Yup para introducir un
 * código de sala (exactamente 3 letras). Al enviar:
 * 1. Convierte el código a mayúsculas y lo guarda en el estado `roomCode`.
 * 2. Redirige automáticamente a la ruta `/play?roomCode=XXX`.
 *
 * Utiliza:
 * - Chakra UI (`Button`, `Modal`, `VStack`, etc.) para la interfaz y animaciones.
 * - Formik y Yup para la gestión y validación del formulario.
 * - React Router `Redirect` para navegar a la sala una vez que se ha capturado el código.
 * - CustomInputField para el campo de texto con manejo de errores.
 *
 * Props:
 * - Reenvía cualquier prop adicional al botón que abre el modal.
 *
 * Ejemplo de uso:
 * <GameCodeModal colorScheme="blue" size="sm" />
 */

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInputField from '../utils/CustomInputField';
import { Redirect } from 'react-router';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  useDisclosure,
  Spacer
} from '@chakra-ui/react';

// Valores iniciales para Formik
const initialValues = { room: '' };

// Esquema de validación: cadena de longitud exacta 3
const validationSchema = Yup.object().shape({
  room: Yup.string()
    .required('Required')
    .length(3, 'Room should be 3 letters long')
});

export default function GameCodeModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomCode, setRoomCode] = useState(null);

  // Si ya tenemos un código válido, redirige a /play con query param
  if (roomCode) {
    return <Redirect to={`/play?roomCode=${roomCode}`} />;
  }

  return (
    <>
      {/* Botón que abre el modal; recibe props como colorScheme, size, etc. */}
      <Button {...props} onClick={onOpen}>
        Room Code
      </Button>

      {/* Modal de Chakra UI con formulario */}
      <Modal
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="noselect" width="20rem" padding="1.5rem">
          <ModalCloseButton />
          <ModalBody justify="center" align="center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async ({ room }, { setSubmitting }) => {
                // Guarda el código en mayúsculas y detiene el spinner
                await setRoomCode(room.toUpperCase());
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form className="auth-form">
                  <VStack justify="center" align="center" w="12.5rem">
                    {/* Campo de entrada personalizado con etiqueta y errores */}
                    <CustomInputField
                      name="room"
                      label="Room Code"
                      error={errors.room}
                      touched={touched.room}
                    />
                    <Spacer />
                    {/* Botón de envío; deshabilitado si el formulario no es válido */}
                    <Button
                      isLoading={isSubmitting}
                      isDisabled={!isValid}
                      type="submit"
                      colorScheme="whatsapp"
                      size="md"
                      variant="solid"
                    >
                      Join Room
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
