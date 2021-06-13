import { MDXProvider as P, MDXProviderProps } from '@mdx-js/react';
import { PropsWithChildren } from 'react';
import Code from '~/components/base/Code';
import SlideRenderer from '~/components/view/SlideRenderer';

/* eslint-disable react/display-name */
// prettier-ignore
const components: MDXProviderProps['components'] = {
  wrapper: SlideRenderer,
  h1: props => <h1 className="text-4xl sm:text-7xl font-bold" {...props} />,
  h2: props => <h2 className="text-2xl sm:text-4xl font-semibold text-gray-700 dark:text-gray-300" {...props} />,
  h3: props => <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300" {...props} />,
  code: props => <Code code={props.children.trim()} language={props.className.replace(/language-/, '')} />
};

export default function MDXProvider({ children }: PropsWithChildren<{}>) {
  return <P components={components}>{children}</P>;
}
