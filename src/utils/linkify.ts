const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const convertTextToLink = (content: string) => {
  const convertContent = content.replace(
    URL_REGEX,
    (url) => `<a href="${url}" target="_blank">${url}</a>`,
  );

  const htmlArr = convertContent.split('\n').map((text) => `<p>${text}</p>`);

  return { __html: htmlArr.join('') };
};
