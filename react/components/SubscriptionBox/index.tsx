import React, { useState, useEffect } from 'react';
import { useProduct } from 'vtex.product-context';
import { FormattedCurrency } from 'vtex.format-currency';
import ToggleButton from '../ToggleButton';

const SubscriptionBox: React.FC = () => {
  const productContext = useProduct();
  const [isSubscriptionAvailable, setIsSubscriptionAvailable] = useState(false); // Controla a exibição do bloco

  useEffect(() => {
    // Verifica se o botão com ID "Assinatura" está disponível
    const subscriptionButton = document.getElementById('Assinatura');
    if (subscriptionButton) {
      console.log('Botão de assinatura encontrado.');
      setIsSubscriptionAvailable(true); // Exibe o bloco
    } else {
      console.log('Botão de assinatura não encontrado.');
      setIsSubscriptionAvailable(false); // Oculta o bloco
    }
  }, []);
  useEffect(() => {
    const buyButton = document.querySelector(".vtex-button__label span[class*=vtex-add-to-cart-button]");
    if(buyButton){
      buyButton.innerHTML = "Compra única"
    }
  }, [isSubscriptionAvailable])

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
  const promotionalPrice = commertialOffer.Price;

  // Calcula o preço com desconto
  const discountPercentage = 15;
  const subscriberPrice = promotionalPrice - (promotionalPrice * discountPercentage) / 100;

  const handleSubscriptionClick = async () => {
    console.log('Assinatura selecionada. Iniciando processo...');

    const subscriptionButton = document.getElementById('Assinatura');
    if (subscriptionButton) {
      console.log('Clicando no botão "Assinatura"...');
      (subscriptionButton as HTMLElement).click();

      // Aguarda um pequeno delay para garantir que o clique tenha efeito
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const addToCartButton = document.querySelector('.vtex-add-to-cart-button-0-x-buttonText');
      if (addToCartButton) {
        console.log('Clicando no botão "Adicionar ao Carrinho"...');
        (addToCartButton as HTMLElement).click();

        // Aguarda outro pequeno delay antes de redirecionar
        setTimeout(() => {
          console.log('Redirecionando para o checkout...');
          window.location.href = '/checkout/#/cart';
        }, 2000);
      } else {
        console.log('Botão "Adicionar ao Carrinho" não encontrado.');
      }
    } else {
      console.log('Botão "Assinatura" não encontrado.');
    }
  };

  // Exibe o bloco somente se o botão de assinatura estiver disponível
  if (!isSubscriptionAvailable) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#F9F9F9',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      {/* Preço original e preço de assinante */}
      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            textDecoration: 'line-through',
            marginRight: '8px',
          }}
        >
          <FormattedCurrency value={promotionalPrice} />
        </span>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#4CAF50',
          }}
        >
          <FormattedCurrency value={subscriberPrice} />
        </span>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#4CAF50',
            marginTop: '4px',
          }}
        >
          Para assinantes
        </div>
      </div>

      {/* Texto promocional */}
      <div
        style={{
          fontSize: '14px',
          color: '#555',
          lineHeight: '1.6',
          marginBottom: '16px',
          textAlign: 'left', // Alinha o texto à esquerda
        }}
      >
        <p>15% de desconto na compra desse produto.</p>
        <p>Descontos e produtos exclusivos para assinantes.</p>
        <p>Sem custo ou mensalidade.</p>
        <p>Assine e aproveite o desconto.</p>
      </div>
      {/* Botão de Assinatura */}
      <div onClick={handleSubscriptionClick}>
        <ToggleButton labelMonth="Assinar no club" />
      </div>
    </div>
  );
};

export default SubscriptionBox;
