const fetchRandomImage = async () => {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=YOUR_KEY_HERE&s=cats",
    { mode: "cors" }
  );
  try {
    const responseJson = await response.json();
    const imgUrl: string = responseJson?.data?.images.original.url;
    return imgUrl;
  } catch (err) {
    console.error(err);
  }
};

export default fetchRandomImage;
