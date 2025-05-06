export const removeLinks = (text: string) => {
	const linkRegex = /(https?\\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;

	const noLinkText = text.replace(linkRegex, '');
	return noLinkText;
};
