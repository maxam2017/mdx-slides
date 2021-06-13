import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsLight from 'prism-react-renderer/themes/github';
import vsDark from 'prism-react-renderer/themes/nightOwl';
import { useStaticTheme } from '~/hooks/useTheme';

interface Props {
  code: string;
  language: Language;
}

const Code = ({ code, language }: Props) => {
  const theme = useStaticTheme();
  return (
    <Highlight
      {...defaultProps}
      theme={theme === 'dark' ? vsDark : vsLight}
      code={code}
      language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={'rounded-xl text-left my-4 p-4 overflow-auto ' + className}
          style={style}>
          {tokens.map((line, i) => (
            <div
              className="table-row"
              key={i}
              {...getLineProps({ line, key: i })}>
              <div className="table-cell text-right pr-4 select-none opacity-50">
                {i + 1}
              </div>
              <div className="table-cell text-lg">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
