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
             external_reference: "fedegarcia222@gmail.com"
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
    }
}