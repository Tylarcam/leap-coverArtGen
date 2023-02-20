const modelIdentifier = "@Album";

const prompts = [
  {
    label: "Abstract Expressionism",
    prompt:
      modelIdentifier +
      " cover art," + 
      " art movement in American painting, developed in New York City in the 1940s, generative art, abstract, abstract art, abstract painting",

  },
  {
    label: "Graffiti Art",
    prompt:
      modelIdentifier +
      " cover art," +
      " graffiti covered wall, dribble, detalized new york background, artwork in the style of z.w. gu, dripping tar, low res, advanced Graffiti in future street art",
  },
  {
    label: "Installation Art",
    prompt:
      modelIdentifier +
      " cover art,"+
      " 3d abstract object sticks to the triptych wall, fine details, high res, wall art paint that lasts forever and never gets boring ",
  },
  {
    label: "Conceptual Art",
    prompt:
      modelIdentifier +
      " cover art inspired by " +
      " Storm Thorgerson, computer art, detailed product image, unknown pleasures, framed poster ",
  },
  {
    label: "Digital Art",
    prompt:
      modelIdentifier +
      " Space Invaders inspired by Marvle Comics," +
      " pixar art 3d, cinematic,"
  },

];

export default prompts;
