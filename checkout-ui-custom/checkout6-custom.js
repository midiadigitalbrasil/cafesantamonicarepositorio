$(document).ready(() => {
  // Adiciona a mensagem de frete grátis
  $('.cart-template-holder').append(
    "<div class='frete-gratis'><p><span>FRETE GRÁTIS</span> para São Paulo e Grande São Paulo. Acima de 150,00 reais.</p></div>"
  )

  const cartCafe = {
    init() {
      $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
        // Atualiza o cálculo de frete
        $('#shipping-calculate-link').trigger('click')
      })
    },
  }

  cartCafe.init()
})
