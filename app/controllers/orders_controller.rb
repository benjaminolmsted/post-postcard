class OrdersController < ApplicationController
    require 'httparty'
    skip_before_action :authorize

    def index
        orders = Order.all.where(user_id: session[:user_id])
        #po = make_prodigi_order
        
        render json: orders
        
    end

    
    def create
        order = Order.create(order_params)
        cart = Cart.all.where(user_id: params[:user_id])

        cart.each do |cartItem|
            op = OrderPostcard.create(order_id: order.id, postcard_id: cartItem.postcard_id, amount: cartItem.amount)
            cartItem.destroy
        end
        #make_prodigi_order
        render json: order, status: :created
    end

    def destroy
        order = Order.first
        order.destroy
    end

    private 
    def order_params
        params.permit(:user_id, :first_name, :last_name, :email, :address_1, :address_2, :city, :state, :zip, :country)
    end

    def make_prodigi_order
        response = HTTParty.post("https://api.sandbox.prodigi.com/v4.0/Orders", 
            :body => {
                "merchantReference": "MyMerchantReference1",
                "shippingMethod": "Overnight",
                "recipient": {
                    "name": "Mr Testtolab",
                    "address": {
                        "line1": "14 test place",
                        "line2": "test",
                        "postalOrZipCode": "12345",
                        "countryCode": "US",
                        "townOrCity": "somewhere",
                        "stateOrCounty": "california"
                    }
                },
                "items": [
                    {
                        "merchantReference": "item #1",
                        "sku": "GLOBAL-CFPM-16X20",
                        "copies": 1,
                        "sizing": "fillPrintArea",
                        "attributes": {
                            "color": "black"
                        },
                        "recipientCost": {
                            "amount": "15.00",
                            "currency": "USD"
                        },
                        "assets": [
                            {
                                "printArea": "default",
                                "url": "https://pwintyimages.blob.core.windows.net/samples/stars/test-sample-grey.png",
                                "md5Hash": "daa1c811c6038e718a23f0d816914b7b"
                            }
                        ]
                    }
                ]
            },
     :headers => { 'Content-Type' => 'application/json', "X-API-Key" => ENV['X-Pwinty-REST-API-Key'] } )
      byebug  
    end

end
