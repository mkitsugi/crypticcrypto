import React from "react";
import Link from "next/link";
import {
  Flex,
  Avatar,
  Box,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Alert,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const PuzzlePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCorrectModalOpen,
    onOpen: onCorrectModalOpen,
    onClose: onCorrectModalClose,
  } = useDisclosure();

  const [remainingAttempts, setRemainingAttempts] = useState(3);

  const problemSets = [
    {
      problem:
        "兄弟は四人いて、全員同じサイズ。\n一緒に動き、\n一緒に止まる。\n彼らは何？",
      answer: "車のタイヤ",
    },
    {
      problem: "一番長い英単語は何でしょう？",
      answer: "smiles",
    },
    // 他の問題と回答のセットを追加
  ];

  const [problemSet, setProblemSet] = useState<{
    problem: string;
    answer: string;
  }>({ problem: "", answer: "" });

  useEffect(() => {
    setProblemSet(problemSets[Math.floor(Math.random() * problemSets.length)]);
  }, []);

  const [answer, setAnswer] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleAnswerChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const inputValue = e.target.value;
    setAnswer(e.target.value);
    setIsSubmitDisabled(inputValue === "");
  };

  const handleSubmit = () => {
    if (answer === problemSet.answer) {
      onCorrectModalOpen();
    } else {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
    }
    onClose();
  };

  const prize = 5000;
  const unit = " Satoshi";
  const walletAddress = "0x3D...AA";
  const participantCount = 5; //仮置きでリアルピッチの際は修正

  return (
    <Flex
      width="100vw"
      height="100vh"
      bgImage="url('/bg.png')"
      bgPos="center"
      bgSize="cover"
      justifyContent={"center"}
      align-content="center"
      align={"center"}
    >
      <Box p={5}>
        <Box
          p={5}
          borderWidth={1}
          borderRadius="lg"
          bgColor="white"
          fontWeight={700}
          textAlign={"center"}
          px={"100px"}
        >
          <Text>
            賞金: {prize} {unit}
          </Text>
          <Text>
            ウォレットアドレス :{" "}
            <Link href={`https://etherscan.io/address/${walletAddress}`}>
              {walletAddress}
            </Link>
          </Text>
        </Box>

        <Text mt={5} textAlign={"center"} fontWeight={"700"} color={"white"}>
          現在の参加者: {participantCount} 人
        </Text>

        <Box
          p={5}
          borderRadius="lg"
          mt={5}
          py={8}
          bgColor={"black"}
          shadow={10}
        >
          <Text fontWeight="bold" color={"white"} pb={2}>
            問題
          </Text>
          <Box
            bgColor={"white"}
            borderRadius={10}
            p="3"
            py="5"
            mt="3"
            width={"25rem"}
          >
            <Text whiteSpace="pre-line" fontWeight={700}>
              {problemSet.problem}
            </Text>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mt={5}>
          <Avatar name="キャラクター名" src="chara.jpg" />
          <Box p={5} bgColor={"white"} borderRadius={10} marginLeft={"1rem"}>
            <Text>君に解けるかな？</Text>
          </Box>
        </Box>

        {remainingAttempts === 0 ? (
          <Alert status="error" mt={5}>
            <AlertIcon />
            残りの試行回数が0です。これ以上回答できません。
          </Alert>
        ) : (
          <Button
            bgColor="green.500"
            color={"white"}
            mt={10}
            width={"100%"}
            onClick={onOpen}
          >
            回答する
          </Button>
        )}

        <Text mt={5} color={"white"} fontWeight={500} textAlign={"center"}>
          あと {remainingAttempts} 回挑戦できます
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin="auto">
          <ModalHeader>回答する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3} fontWeight={"700"}>
              回答内容
            </Text>
            <Input
              placeholder="回答を入力..."
              mb={6}
              onChange={handleAnswerChange}
            />
            <Text mb={3} fontWeight={"700"}>
              賞金を受け取るアドレス
            </Text>
            <Input placeholder="アドレスを入力..." />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              width={"100%"}
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              回答を確定する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCorrectModalOpen} onClose={onCorrectModalClose}>
        <ModalOverlay />
        <ModalContent margin="auto">
          <ModalHeader>正解です！🎉🎉</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>素晴らしい！先着順で賞金が送付されます。</ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PuzzlePage;
