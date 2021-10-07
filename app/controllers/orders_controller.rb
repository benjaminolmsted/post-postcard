class OrdersController < ApplicationController
    require 'httparty'
    skip_before_action :authorize

    def index
        orders = Order.all.where(user_id: session[:user_id])
        render json: orders
    end

    
    def create
        order = Order.create(order_params)
        cart = Cart.all.where(user_id: params[:user_id])
        items = []
        cart.each do |cartItem|
            op = OrderPostcard.create(order_id: order.id, postcard_id: cartItem.postcard_id, amount: cartItem.amount)
            cartItem.destroy
            postcard = Postcard.find(op.postcard_id)
            items.push({
                "merchantReference": "postcard",
                "sku": "GLOBAL-POST-GLOS-6X4",
                "copies": op.amount,
                "sizing": "fillPrintArea",
                # "attributes": {
                #     "color": "black"
                # },
                "recipientCost": {
                    "amount": "2.19",
                    "currency": "USD"
                },
                "assets": [
                    {
                        "printArea": "default",
                        "url": postcard.image_url,
                    }
                    ]
                }
                )
        end
        prodigi_order = make_prodigi_order(items, params)
        render json: {order: order, prodigi_order: prodigi_order}.to_json, status: :created
    end

    def destroy
        order = Order.first
        order.destroy
    end

    private 
    def order_params
        params.permit(:user_id, :first_name, :last_name, :email, :address_1, :address_2, :city, :state, :zip, :country)
    end

    def make_prodigi_order(items, post_params)
        response = HTTParty.post("https://api.sandbox.prodigi.com/v4.0/Orders", 
            :body => {
                "merchantReference": "MyMerchantReference1",
                "shippingMethod": "Overnight",
                "recipient": {
                    "name": post_params[:first_name] + ' ' + post_params[:last_name],
                    "address": {
                        "line1": post_params[:address_1],
                        "line2": post_params[:address_2],
                        "postalOrZipCode": post_params[:zip],
                        "countryCode": post_params[:country],
                        "townOrCity": post_params[:city],
                        "stateOrCounty": post_params[:state]
                    }
                },
                "items": items
            }.to_json,
     :headers => { 'Content-Type' => 'application/json', "X-API-Key" => ENV['X-Pwinty-REST-API-Key'] } )  
    end

end
