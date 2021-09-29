class OrdersController < ApplicationController
skip_before_action :authorize

    def index
        orders = Order.all.where(user_id: session[:user_id])
        render json: orders
        
    end

    
    def create
        order = Order.create(order_params)
        cart = Cart.all.where(user_id: params[:user_id])
        cart.each do |cartItem|
            op = OrderPostcard.create(order_id: order.id, postcard_id: cartItem.postcard_id)
            cartItem.destroy
        end
    end

    # def destroy
    #     order = Order.first
    #     order.destroy
    # end

    private 
    def order_params
        params.permit(:user_id, :first_name, :last_name, :email, :address_1, :address_2, :city, :state, :zip, :country)
    end


end
