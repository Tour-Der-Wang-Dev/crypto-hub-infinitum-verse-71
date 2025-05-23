
import Layout from '@/components/Layout';
import CryptoMap from '@/components/map/CryptoMap';

const MapPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Crypto Payment Map</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Find crypto-friendly businesses, ATMs, and exchanges near you. Pay with Bitcoin, Ethereum, and other cryptocurrencies worldwide.
          </p>
        </div>
        <CryptoMap />
      </div>
    </Layout>
  );
};

export default MapPage;
