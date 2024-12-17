import React, { useState, useEffect } from 'react';
import './styles.css'; // Arquivo CSS para estilização

interface ToggleButtonProps {
  labelMonth?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  labelMonth = 'Assinatura - 1 Mês (15% de desconto)',
}) => {
  const [selectedOption, setSelectedOption] = useState<'month' | ''>(''); // Estado do botão selecionado
  const [isVisible, setIsVisible] = useState(false); // Controla a visibilidade do botão

  useEffect(() => {
    // Verifica se o botão com ID "Assinatura" existe
    const subscriptionButton = document.getElementById('Assinatura');
    if (subscriptionButton) {
      console.log('Botão de assinatura encontrado.');
      setIsVisible(true); // Exibe o botão "Assinar"
    } else {
      console.log('Botão de assinatura não encontrado.');
      setIsVisible(false); // Oculta o botão "Assinar"
    }
  }, []);

  const handleToggle = async (option: 'month') => {
    setSelectedOption(option);

    if (option === 'month' && isVisible) {
      const subscriptionButton = document.getElementById('vtex-button__label flex items-center justify-center h-100 ph6');
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
    }
  };

  if (!isVisible) {
    // Não renderiza o botão se a assinatura não estiver disponível
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div
        className={`subscription-card ${selectedOption === 'month' ? 'selected' : ''}`}
        onClick={() => handleToggle('month')}
      >
        <input
          type="radio"
          name="subscription"
          checked={selectedOption === 'month'}
          onChange={() => handleToggle('month')}
          className="radio-button"
        />
        {labelMonth}
      </div>
    </div>
  );
};

export default ToggleButton;
