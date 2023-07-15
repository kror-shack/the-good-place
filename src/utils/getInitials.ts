const getInitials = (name: string): string => {
  const words = name.split(" ");

  if (words.length === 1) {
    // Single word case
    return words[0].slice(0, 2);
  } else if (words.length > 1) {
    // Multiple words case
    const firstInitial = words[0].charAt(0);
    const lastInitial = words[words.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`;
  }

  // Invalid input case (empty string)
  return "";
};

export default getInitials;
