import MDXProvider from '~/context/MDXProvider';
import MDXContent from '~/markdown/presentation.mdx';

export default function Page() {
  return (
    <MDXProvider>
      <MDXContent />
    </MDXProvider>
  );
}
