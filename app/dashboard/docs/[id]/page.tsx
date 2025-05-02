import { Suspense } from 'react';
import { LoadingScreen } from '@/components/summary/LoadingScreen';
import { SummaryView } from '@/components/summary/SummaryView';

export default async function DocumentSummaryPage( params : any) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SummaryView documentId={params.id} />
    </Suspense>
  );
}
