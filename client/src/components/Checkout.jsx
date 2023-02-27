import { useEffect } from "react";

const Checkout = () => {

  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 }
  ]

  let amount = 0
  products.forEach(product => { amount += product.price })


  const mp = new MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY_TEST);
  
  useEffect(() => { 
    const cardForm = mp.cardForm({
      amount: ""+amount,
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "cardNumber",
          placeholder: "Numero de tarjeta",
        },
        expirationDate: {
          id: "expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "securityCode",
          placeholder: "Código de seguridad",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular de la tarjeta",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emisor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Cuotas",
        },        
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número del documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: event => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          fetch("/api/mercadopago/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descripción del producto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          })
          .then(response => response.json())
          .then(json => {
              // if everything is ok => redirect to success page
              // if errors => display errors
            })
          ;
        },
        onFetching: (resource) => {
          // show paying modal
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        }
      },
    });
  })

  return(
    <div className="flex justify-center align-center w-screen h-screen bg-blue-50">
      <form id="form-checkout" className="flex flex-col w-1/2 p-4 mb-10 mt-10 bg-white rounded-xl overflow-scroll">
        <div className="text-4xl font-semibold mb-10 flex">
          <h2 className="grow">Checkout</h2>
          <h3>${amount}</h3>
        </div>
        <label className="mb-2">Número de tarjeta:</label>
        <div id="cardNumber" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
        <label className="mb-2">Fecha de vencimiento:</label>
        <div id="expirationDate" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
        <label className="mb-2">CVV:</label>
        <div id="securityCode" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
        <label className="mb-2">Nombre del titular:</label>
        <input type="text" id="form-checkout__cardholderName" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4" />
        <select id="form-checkout__issuer" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></select>
        <select id="form-checkout__installments" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></select>
        <select id="form-checkout__identificationType" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></select>
        <input type="text" id="form-checkout__identificationNumber" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4" />
        <input type="email" id="form-checkout__cardholderEmail" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4" />

        <button type="submit" id="form-checkout__submit">Pagar</button>
        <progress value="0" className="progress-bar">Carregando...</progress>
      </form>
    </div>
  )
}
export default Checkout
