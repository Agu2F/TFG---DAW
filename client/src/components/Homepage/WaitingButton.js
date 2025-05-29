/**
 * WaitingButton
 *
 * Componente que muestra un botón de “Matchmaking” y, al pulsarlo,
 * despliega un Popover indicando cuántos usuarios están en cola.
 *
 * Props:
 * @param {string} w           - Ancho del botón (p. ej. "30%").
 * @param {string} size        - Tamaño del botón (p. ej. "lg").
 * @param {Function} onClose   - Callback al cerrar el Popover.
 * @param {Function} onTrigger - Callback al abrir el Popover (iniciar espera).
 * @param {number} queueLength - Número de usuarios actualmente en la cola.
 *
 * Detalles:
 * - Utiliza Chakra UI para Popover, Spinner y tipografía.
 * - Muestra un Spinner y un mensaje “Waiting, X in Queue.”
 * - Si la cola está vacía, muestra un texto adicional informando
 *   de que el servidor puede tardar en “cold start” (hasta 1 min).
 */
import React from 'react';
import {
  Popover,
  Portal,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Heading,
  Text,
  Spinner,
  HStack,
  VStack,
} from '@chakra-ui/react';

export default function WaitingButton({
  w,
  size,
  onClose,
  onTrigger,
  queueLength,
}) {
  return (
    <Popover flip={true} returnFocusOnClose={true} onClose={onClose}>
      <PopoverTrigger>
        <Button w={w} size={size} onClick={onTrigger}>
          Matchmaking
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="fit-content" p="1rem 1.5rem" className="noselect">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack>
              <HStack s="1rem">
                <Spinner />
                <Heading size="md">
                  {`Waiting, ${queueLength} in Queue.`}
                </Heading>
              </HStack>
              {queueLength === 0 && (
                <Text size="sm">
                  Please be patient. The server can take up to 1 min to cold
                  start.
                </Text>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
