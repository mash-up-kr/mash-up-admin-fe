import React from 'react';

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const useConvertTextToLink = (content: string) => {
  const handleLineBreak = (text: string) => {
    return text.split('\n').map((each) => (each ? <p>{each}</p> : <br />));
  };

  return content.split(URL_REGEX).map((each) => {
    if (each.match(URL_REGEX)) {
      return (
        <a href={each} target="_blank" rel="noopener noreferrer">
          {each}
        </a>
      );
    }
    return handleLineBreak(each);
  });
};

export default useConvertTextToLink;
