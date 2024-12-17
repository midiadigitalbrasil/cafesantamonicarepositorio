$(document).ready(() => {
    // Adiciona a mensagem de frete grátis
    $('.cart-template-holder').append(
      "<div class='frete-gratis'><p><span>FRETE GRÁTIS</span> para São Paulo e Grande São Paulo. Acima de 150,00 reais.</p></div>"
    );
  
    const cartCafe = {
      init() {
        $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
          // Atualiza o cálculo de frete
          $('#shipping-calculate-link').trigger('click');
        });
      },
    };
  
    // Função para calcular e exibir o preço do assinante com 15% de desconto ao lado do preço original
    function applySubscriberDiscount() {
      // Seleciona todos os elementos de preço na página
      $('[data-price]').each(function () {
        const originalPriceText = $(this).text();
        const originalPrice = parseFloat(originalPriceText.replace('R$', '').replace(',', '.'));
  
        if (!isNaN(originalPrice)) {
          // Calcula o preço com 15% de desconto
          const discountedPrice = (originalPrice * 0.85).toFixed(2);
  
          // Formata o valor com desconto e exibe ao lado do preço original
          if (!$(this).next('.subscriber-price').length) {
            $(this).after(`
              <div class="subscriber-price" style="color: green; font-weight: bold; margin-top: 5px;">
                Preço do Assinante: R$ ${discountedPrice.replace('.', ',')}
              </div>
            `);
          }
        }
      });
    }
  
    // Executa a função ao carregar a página
    applySubscriberDiscount();
  
    // Reaplica o desconto quando o conteúdo da página for atualizado (como na mudança de página)
    $(document).on('DOMNodeInserted', function() {
      applySubscriberDiscount();
    });
  
    cartCafe.init();
  });
  