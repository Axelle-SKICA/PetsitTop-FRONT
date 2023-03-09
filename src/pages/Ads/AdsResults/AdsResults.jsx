import CounterResults from '../../../components/CounterResults/CounterResults';
import AdCard from './AdCard/AdCard';
import './AdsResults.scss';

function AdsResults({ adsList }) {
  console.log(adsList);
  return (
    <>
      <CounterResults
        arrayResult={adsList}
        searchType="annonce"
      />
      {adsList.results.map((ad) => (
        <AdCard
          key={ad.id}
          {...ad}
        />
      ))}
    </>
  );
}

export default AdsResults;
