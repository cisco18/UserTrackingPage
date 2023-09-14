import React from 'react';
import {Typography} from 'antd';
import {LoremIpsum} from 'lorem-ipsum';

const {Paragraph} = Typography;

export const TenParagraphs = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 12,
      min: 8,
    },
  });


  const createTenParagraphs = () => {
    const paragraphs = [];

    for (let i = 0; i < 10; i++) {
      paragraphs.push(
          <Paragraph key={i}>
            {lorem.generateParagraphs(1)}
          </Paragraph>,
      );
    }

    return paragraphs;
  };

  return (<>
    <Typography>


      {createTenParagraphs()}

    </Typography>
  </>
  );
};
