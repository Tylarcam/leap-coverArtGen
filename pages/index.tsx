/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { AiFillGithub } from "react-icons/ai";
import { NextSeo } from "next-seo";

import prompts from "helpers/prompts";

const Home = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [images, setImages] = useState<string[]>([
    "/default.png",
  ]);

  const generate = async () => {
    setLoading(true);
    // hit leap in our nextjs api route
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const image = await response.json();
    console.log(image);
    if (image.error) {
      window.alert("Error: " + image.error + " " + image.message);
      setLoading(false);
      return;
    }
    // set images array, to switch the default image
    const uris = image.images.map((image: { uri: string }) => image.uri);
    setImages(uris);
    setLoading(false);
  };

  return (
    <>
      <NextSeo
        title="Cover Art Generator"
        description="Generate Cover Art is a web app that uses the LeapML API to generate images of background art. It's built with Next.js, Chakra UI, and Leap AI."
      />
      <VStack
        minH="100vh"
        w="100vw"
        spacing={4}
        bg="#190336"
        px={4}
        paddingBottom={4}
      >
        <VStack spacing={1}>
          <Heading
            pt={{
              base: 12,
              md: 32,
            }}
            color="gray.200"
            fontFamily="harryfont"
          >
            Flash
          </Heading>
          <Text
            color="gray.300"
            fontSize="lg"
            w={{ base: "full", md: "lg" }}
            textAlign="center"
            fontFamily="monospace"
            p= {4}
          >
            Enter a prompt like "Make me a mottled background" to generate an image.
          </Text>
        </VStack>

        <Input
          w={{ base: "full", md: "30rem" }}
          py={4}
          color="gray.100"
          focusBorderColor="gray.100"
          variant="outline"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              generate();
            }
          }}
          fontFamily="monospace"
          placeholder="Enter your image generation prompt here"
        />

        <Button
          w={{ base: "full", md: "30rem" }}
          _hover={loading ? {} : { opacity: 0.8 }}
          _active={loading ? {} : { transform: "scale(0.98)", opacity: 0.7 }}
          transitionDuration="200ms"
          bg="#C99D25"
          color="white"
          p={2}
          fontFamily="monospace"
          rounded="lg"
          fontSize="lg"
          key={prompt}
          onClick={() => generate()}
          isLoading={loading}
        >
          Generate
        </Button>

        <Box w={{ base: "full", md: "30rem" }} h="full">
          {images.map((image) => (
            <Image
            // I want to make the box shjow up horizontally
              key={image}
              src={image}
              alt="StoneAgeTC"
              rounded="lg"
              w="full"
              h= "full"
              objectFit="contain"
              transitionDuration="200ms"
              opacity={loading ? 0.3 : 1}
            />
          ))}
        </Box>

        <Wrap w={{ base: "full", md: "30rem" }} justify="center">
          {prompts.map((prompt) => (
            <WrapItem key={prompt.label}>
              <HStack
                w="full"
                _hover={{ opacity: 0.8 }}
                _active={{ transform: "scale(0.98)", opacity: 0.7 }}
                transitionDuration="200ms"
                fontWeight={"bold"}
                color="white"
                p={2}
                border={"1px solid #fff"}
                rounded="lg"
                fontSize="xs"
                key={prompt.label}
                cursor="pointer"
                onClick={() => setPrompt(prompt.prompt)}
              >
                <Text>{prompt.label}</Text>
              </HStack>
            </WrapItem>
          ))}
        </Wrap>


        <HStack
          bg="white"
          p={4}
          py={2}
          rounded="md"
          _hover={{ opacity: 0.8 }}
          _active={{ transform: "scale(0.99)", opacity: 0.7 }}
          cursor="pointer"
          transitionDuration="200ms"
          pos="absolute"
          bottom={4}
          right={4}
          onClick={() =>
            window.open("https://github.com/Tylarcam")
          }
        >
          <AiFillGithub color="black" />
          <Text fontWeight={"bold"} color={"#1c1c1c"}>
            Star this project on Github
          </Text>
        </HStack>
      </VStack>
    </>
  );
};

export default Home;
