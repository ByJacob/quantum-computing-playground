import getIntl from '@/app/intl';

async function pageIntl() {
  const navIntl = await getIntl('stern-gerlach');
  return navIntl;
}

export async function generateMetadata() {
  const intl = await pageIntl();
  return {
    title: intl.formatMessage({ id: 'title' }),
  };
}

export default function HomePage() {
  return (
    <>
      <p>Stern Gerlach Experiment</p>
    </>
  );
}
