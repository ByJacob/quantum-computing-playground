import getIntl from '@/app/intl';
import { SternGerlachExperiment } from '@/components/SternGerlachExperiment';

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

export default async function HomePage() {
  const intl = await pageIntl();
  return (
    <>
      <p>Stern Gerlach Experiment</p>
      <SternGerlachExperiment messages={intl.messages} locale={intl.locale}/>
    </>
  );
}
