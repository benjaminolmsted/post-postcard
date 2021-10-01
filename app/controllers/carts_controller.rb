class CartsController < ApplicationController
    skip_before_action :authorize


    def index
        carts = Cart.all.where(user_id: params[:user_id])
        render json: carts
    end

    def create
        cart = Cart.create(user_id: params[:user_id], postcard_id: params[:postcard_id])
        cart.amount = 1
        cart.save
        #byebug
        render json: cart, status: :created
    end

    def update
        cart = Cart.find(params[:cart][:id])
        cart.update(amount: params[:cart][:amount])
        render json: cart
    end

    def destroy
        cart = Cart.find(params[:id])
        cart.destroy
        head :no_content
    end

end
