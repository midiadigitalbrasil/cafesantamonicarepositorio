import React from 'react';
import { useProduct } from 'vtex.product-context';
import { FormattedCurrency } from 'vtex.format-currency';

const SubscriberPrice: React.FC = () => {
  const productContext = useProduct();

  if (!productContext) {
    console.log('Product context is not available.');
    return null;
  }

  const selectedItem = productContext.selectedItem;
  if (!selectedItem || !selectedItem.sellers || selectedItem.sellers.length === 0) {
    console.log('Selected item ou sellers não estão disponíveis.');
    return null;
  }

  const seller = selectedItem.sellers[0];
  if (!seller.commertialOffer) {
    console.log('commertialOffer não está disponível.');
    return null;
  }

  
  const commertialOffer = seller.commertialOffer;
  const promotionalPrice = commertialOffer.ListPrice;

  // Usa o preço promocional como base para o desconto do assinante
  const basePrice = promotionalPrice;

  const isSubscriptionAvailable = productContext.product?.productClusters.some((cluster: any) => cluster.name.toLowerCase().includes("assinatura"))
  const subscriptionRef = productContext.product?.productClusters.find((cluster: any) => cluster.name.toLowerCase().includes("assinatura-"));
  const subscriptionDiscount = subscriptionRef?.name.includes('-') ? parseInt(subscriptionRef.name.split('-')[1]) : 15

  const subscriberPrice = basePrice - (basePrice * subscriptionDiscount) / 100;

  return isSubscriptionAvailable ? (
    <div style={{ marginTop: '5px' }}>
      <div
        style={{
          color: '#4CAF50', // Cor verde para o preço
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center', // Centraliza o texto
        }}
      >
        <FormattedCurrency value={subscriberPrice} />
      </div>
      <div
        style={{
          color: '#373837', // Cor laranja para o texto
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '10px',
          textAlign: 'center', // Centraliza o texto
          marginTop: '2px',
        }}
      >
        Para assinantes
      </div>
    </div>
  ) : <></>
};

export default SubscriberPrice;


