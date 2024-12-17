// assets/js/subscriber-price.js

(function () {
    const discountPercentage = 15
  
    // Função para formatar o preço em moeda brasileira
    function formatPrice(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }
  
    // Função para processar os preços na página
    function processPrices() {
      // Seletor para os elementos de preço (ajuste conforme sua loja)
      const priceSelectors = [
        '.price', // Ajuste este seletor para corresponder aos elementos de preço
        '.product-price',
        // Adicione outros seletores conforme necessário
      ]
  
      // Iterar sobre cada seletor
      priceSelectors.forEach((selector) => {
        const priceElements = document.querySelectorAll(selector)
  
        priceElements.forEach((priceElement) => {
          // Verificar se o preço de assinante já foi adicionado
          if (priceElement.dataset.subscriberPriceAdded) {
            return
          }
  
          // Obter o preço original do elemento
          const priceText = priceElement.textContent
            .replace(/[^\d,]/g, '')
            .replace(',', '.')
          const originalPrice = parseFloat(priceText)
  
          if (isNaN(originalPrice)) {
            return
          }
  
          // Calcular o preço de assinante
          const subscriberPrice =
            originalPrice * (1 - discountPercentage / 100)
  
          // Criar o elemento para exibir o preço de assinante
          const subscriberPriceElement = document.createElement('div')
          subscriberPriceElement.textContent = `Preço de assinante: ${formatPrice(
            subscriberPrice
          )}`
          subscriberPriceElement.classList.add('subscriber-price')
  
          // Inserir o elemento após o preço original
          priceElement.parentNode.insertBefore(
            subscriberPriceElement,
            priceElement.nextSibling
          )
  
          // Marcar o elemento para evitar duplicação
          priceElement.dataset.subscriberPriceAdded = 'true'
        })
      })
    }
  
    // Executar a função após o carregamento da página
    document.addEventListener('DOMContentLoaded', processPrices)
  
    // Observar mudanças no DOM para capturar conteúdos carregados dinamicamente
    const observer = new MutationObserver(() => {
      processPrices()
    })
  
    observer.observe(document.body, { childList: true, subtree: true })
  })()
  