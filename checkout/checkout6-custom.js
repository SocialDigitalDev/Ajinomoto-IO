var $doc = $(document)
var $win = $(window)

$doc.ready(() => {
    var hash = window.location.hash

    if (hash === "#/cart") {
        $('.header--progressBar .step-1').addClass('active')

        $('.step-text').text('Carrinho')
        $('.step-number').text('1')
    } else if (hash === "#/email" || hash === "#/profile") {
        $('.header--progressBar .step-1').addClass('active')
        $('.header--progressBar .step-2').addClass('active')

        $('.step-text').text('Dados pessoais')
        $('.step-number').text('2')
    } else if (hash === "#/shipping") {
        $('.header--progressBar .step-1').addClass('active')
        $('.header--progressBar .step-2').addClass('active')
        $('.header--progressBar .step-3').addClass('active')

        $('.step-text').text('Endereço')
        $('.step-number').text('3')
    } else if (hash === "#/payment") {
        $('.header--progressBar .step-1').addClass('active')
        $('.header--progressBar .step-2').addClass('active')
        $('.header--progressBar .step-3').addClass('active')
        $('.header--progressBar .step-4').addClass('active')

        $('.step-text').text('Pagamento')
        $('.step-number').text('4')
    }
})

$win.on('hashchange',() => {
    
    var hash = window.location.hash
    
    if (hash === "#/cart") {
        $('.header--progressBar .step-1').addClass('active')
        $('.header--progressBar .step-2').removeClass('active')
        $('.header--progressBar .step-3').removeClass('active')
        $('.header--progressBar .step-4').removeClass('active')

        $('.step-text').text('Carrinho')
        $('.step-number').text('1')
    } else if (hash === "#/email" || hash === "#/profile") {
        $('.header--progressBar .step-1, .header--progressBar .step-2').addClass('active')
        $('.header--progressBar .step-3, .header--progressBar .step-4').removeClass('active')

        $('.step-text').text('Dados pessoais')
        $('.step-number').text('2')
    } else if (hash === "#/shipping") {
        $('.header--progressBar .step-1, .header--progressBar .step-2, .header--progressBar .step-3').addClass('active')
        $('.header--progressBar .step-4').removeClass('active')

        $('.step-text').text('Endereço')
        $('.step-number').text('3')
    } else if (hash === "#/payment") {
        $('.header--progressBar .step-1, .header--progressBar .step-2, .header--progressBar .step-3, , .header--progressBar .step-4').addClass('active')

        $('.step-text').text('Pagamento')
        $('.step-number').text('4')
    }
    
})