// Next.js chapter: SEO, Images and Fonts.

export default {
  id: 'seo-media',
  title: 'SEO, Images & Fonts',
  description: 'Metadata API, next/image, next/font and sitemaps',
  icon: 'image',
  lessons: [
    {
      id: 'nx-metadata',
      title: 'Metadata API',
      blocks: [
        { type: 'text', value: 'Export a metadata object or a generateMetadata function to set the title, description and social preview tags for each page. Search engines and link previews read these tags from the server-rendered HTML.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// Static metadata for one page
export const metadata = {
  title: 'Courses | CodeNest',
  description: 'Learn web development with live lessons.',
};

// Dynamic metadata per course
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);
  return {
    title: course.title + ' | CodeNest',
    description: course.tagline,
    openGraph: { images: ['/og/' + slug + '.png'] },
  };
}` },
        { type: 'note', value: 'Metadata in a layout is inherited by child pages. Override it on a page when the page has its own title.' },
      ],
    },
    {
      id: 'nx-image-font',
      title: 'next/image and next/font',
      blocks: [
        { type: 'text', value: 'next/image resizes, lazy-loads and serves modern formats such as WebP and AVIF. next/font downloads and self-hosts a font at build time, so there is no layout shift and no request to a font CDN from the browser.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Hero() {
  return (
    <div className={inter.className}>
      <Image
        src="/hero.jpg"
        alt="Students learning to code"
        width={1200}
        height={600}
        priority
      />
    </div>
  );
}` },
        { type: 'list', items: [
          'Always set width and height, or use fill inside a sized parent',
          'Use priority only for the main image above the fold',
          'Set alt text that describes the image',
        ] },
      ],
    },
    {
      id: 'nx-sitemap-robots',
      title: 'Sitemap and robots',
      blocks: [
        { type: 'text', value: 'A sitemap lists the pages you want search engines to index. A robots file tells crawlers which paths to skip. Next.js can generate both from code.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();
  return [
    { url: 'https://codenest.app', lastModified: new Date() },
    ...courses.map(c => ({ url: 'https://codenest.app/courses/' + c.slug })),
  ];
}` },
        { type: 'note', value: 'Make sure the sitemap only lists public pages. Listing a private dashboard does not hide it and can leak its URL.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'seo-media',
      q: 'Why is the Metadata API useful for SEO?',
      options: ['It makes pages faster on the client', 'It sets title and description tags in the server-rendered HTML', 'It removes the need for content', 'It hides pages from Google'],
      answer: 1,
      explain: 'Crawlers read the tags from the HTML the server sends.',
    },
    {
      chapterId: 'seo-media',
      q: 'What must you set on next/image to avoid layout shift?',
      options: ['A border', 'width and height, or fill in a sized parent', 'A CSS animation', 'A database id'],
      answer: 1,
      explain: 'The browser needs the space before the image loads.',
    },
    {
      chapterId: 'seo-media',
      q: 'What does next/font do?',
      options: ['Loads fonts from the browser at runtime only', 'Self-hosts fonts at build time', 'Adds emoji', 'Blocks CSS'],
      answer: 1,
      explain: 'Self-hosting avoids a font request and layout flashes.',
    },
    {
      chapterId: 'seo-media',
      q: 'What should a sitemap include?',
      options: ['Private dashboards', 'Public pages you want indexed', 'Passwords', 'Test files'],
      answer: 1,
      explain: 'The sitemap lists pages meant for search engines.',
    },
  ],
};
