import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";

export default function DeleteModal({
  isOpen,
  onClose,
  callback,
  title,
  password,
  setPassword,
}: {
  isOpen: boolean;
  onClose: () => void;
  callback: () => void;
  title: string;
  password: string;
  setPassword: (password: string) => void;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}를 삭제할까요?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack textAlign="center" marginBottom="2">
              <Text>삭제한 뒤 복구는 불가능합니다!</Text>
              <Text>비밀번호를 입력해 주세요.</Text>
            </Stack>
            <Input
              placeholder="삭제 비밀번호 입력"
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={callback}>
              Delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
