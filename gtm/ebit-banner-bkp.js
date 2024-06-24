<script>
  var orderWrapper = document.querySelector('.vtex-order-placed-2-x-orderWrapper');
  var paymentTypes = '14';
  
  switch ({{SDC | ebit | objData-paymentType}}) {
    case 'Mastercard':
      paymentTypes = '05';
      break;
    case 'Pix':
      paymentTypes = '90';
      break;
    case 'Visa':
      paymentTypes = '05';
      break;
    case 'Boleto Bancário':
      paymentTypes = '08';
      break;
    case 'American Express':
      paymentTypes = '05';
      break;
    case 'Mastercard, Vale':
      paymentTypes = '05';
      break;
    case 'Mastercard, Visa':
      paymentTypes = '05';
      break;
    case 'Pix, Vale':
      paymentTypes = '90';
      break;
    default:
      paymentTypes = '14';
  }
  
  var paramString = "storeId=124583&platform=VTEX&email=" + {{SDC | ebit | objData-email}} + "&zipCode=" + {{SDC | ebit | objData-zipCode}} + "&parcels=" + {{SDC | ebit | objData-parcels}} + "&deliveryTax=" + {{SDC | ebit | objData-deliveryTax}} + "&deliveryTime=" + {{SDC | ebit | objData-deliveryTime}} + "&mktSaleId=1&totalSpent=" + {{SDC | ebit | objData-totalSpent}} + "&value=" + {{SDC | ebit | objData-value}} + "&quantity=" + {{SDC | ebit | objData-quantity}} + "&productName=" + {{SDC | ebit | objData-productName}} + "&transactionId=" + {{SDC | ebit | objData-transactionId}} + "&paymentType=" + paymentTypes + "";
  
  var elDiv = document.createElement("div");
  elDiv.classList.add("ebit-banner");
  
  var elAnchor = document.createElement("a");
  elAnchor.id = "bannerEbit";
  
  var elParam = document.createElement("param");
  elParam.storeId = "124583";
  elParam.platform = "VTEX";
  elParam.paymentType = paymentTypes;
  elParam.transactionId = {{SDC | ebit | objData-transactionId}};
  elParam.productName = {{SDC | ebit | objData-productName}};
  elParam.quantity = {{SDC | ebit | objData-quantity}};
  elParam.value = {{SDC | ebit | objData-value}};
  elParam.totalSpent = {{SDC | ebit | objData-totalSpent}};
  elParam.mktSaleId = "1";
  elParam.deliveryTime = {{SDC | ebit | objData-deliveryTime}};
  elParam.deliveryTax = {{SDC | ebit | objData-deliveryTax}};
  elParam.parcels = {{SDC | ebit | objData-parcels}};
  elParam.zipCode = {{SDC | ebit | objData-zipCode}};
  elParam.email = {{SDC | ebit | objData-email}};
  elParam.id = "ebitParam";
  
  var elScript = document.createElement("script");
  elScript.type = "text/javascript";
  elScript.id = "getSelo";
  elScript.src = "https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?124583&lightbox=true"
  
  elDiv.appendChild(elParam);
  elDiv.appendChild(elAnchor);
  elDiv.appendChild(elScript);
  
  orderWrapper.appendChild(elDiv);
  
</script>