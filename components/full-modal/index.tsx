import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface ModalProps {
  size?: string;
  title?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({
  size = "full",
  title = "Modal Title",
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
