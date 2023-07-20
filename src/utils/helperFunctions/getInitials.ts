const getInitials = (name: string): string => {
  const words = name.split(" ");

  if (words.length === 1) {
    return words[0].slice(0, 2);
  } else if (words.length > 1) {
    const firstInitial = words[0].charAt(0);
    const lastInitial = words[words.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`;
  }

  return "";
};

export default getInitials;
