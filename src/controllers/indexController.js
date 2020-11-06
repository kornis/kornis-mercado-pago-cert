const mercadopago = require('mercadopago');

//para la certificación usamos datos que nos provee mercadopago
mercadopago.configure({
    access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
});

/*Preferencia: información del producto. Atributos importantes: importe, producto, cantidad, tarjetas que permitimos, usuario, a donde lo llevamos cuando pago aprobado o rechazado, cuotas. Ver documentacion preferences*/


module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {

        const preferenceObj = {
            items: [
                {
                    id: "1234",
                    title: req.query.title,
                    picture_url: req.query.img,
                    description: "Calzado con muucha facha",
                    quantity: 1,
                    unit_price: Number(req.query.price)
                }
             ],
             payer: {
                 name: "Ryan",
                 surname: "Dahl",
                 email: "test_user_63274575@testuser.com",
                 phone: {
                     area_code: "11",
                     number: 55556666
                 },
                 address: {
                     zip_code: "1234",
                     street_name: "Monroe",
                     street_number: 860
                 }
             },
             payment_methods: {
                 excluded_payment_methods: 
                 [
                     {
                        id: "visa",
                    },
                    {
                        id: "debvisa"
                    }
                ],
                excluded_payment_type: [
                    {
                        id: "atm"
                    }
                ],
                installments: 12
             },
             back_urls: {
                 success: "https://kornis-mercado-pago-cert.herokuapp.com/success",
                 pending: "https://kornis-mercado-pago-cert.herokuapp.com/pending",
                 failure: "https://kornis-mercado-pago-cert.herokuapp.com/failure"
             },
             auto_return: "approved",
             external_reference: "fedegarcia222@gmail.com",
             notification_url: "https://kornis-mercado-pago-cert.herokuapp.com/notifications?source_news=webhooks"
        }

        mercadopago.preferences.create(preferenceObj)
            .then(response => {
                const preference = response.body;
                
                return res.render("detail", { ...req.query, preference });
            })

    },

    success: (req, res) => {
        return res.render("success", { ...req.query });
    },

    pending:(req, res) => {
        return res.render("pending")
    },
    
    failure:(req, res) => {
        return res.render("failure")
    },
    notifications: (req,res) => {
        console.log(req.body);

        switch(req.body.type){
            case "test":
                return res.status(200).end("All Ok");
            default:
                return res.status(500).end("Error");
        }
        /*
        if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });

            req.on("end", () => {
              let bodyParsed = JSON.parse(body);
             
              switch (bodyParsed.type) {
                case "payment":
                  return res.status(200).end("Payment created");
                  break;
                case "plan":
                  return res.status(200).end("Plan created"); 
                  break;
                case "subscription":
                  return res.status(200).end("Subscription created");
                  break;
                case "invoice":
                  return res.status(200).end("Invoice created");
                  break;
                case "test":
                  return res.status(200).end("TEST");
                default:
                  return res.status(400).end("TYPE NOT FOUND");
                  break;
              }
            });
          } else {
            return res.status(500).end("BAD REQUEST");
          }*/
    }
}