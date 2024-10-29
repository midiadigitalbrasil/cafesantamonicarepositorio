$(document).ready(() => {
  $('.cart-template-holder').append(
    "<div class='frete-gratis'><p><span>FRETE GRÁTIS</span> para São Paulo e Grande São Paulo. Acima de 150,00 reais.</p></div>"
  )
})

const cartCafe = {
  init() {
    $(window).on('orderFormUpdated.vtex', function () {
      $('#shipping-calculate-link').trigger('click')
    })
  },
}

cartCafe.init()
