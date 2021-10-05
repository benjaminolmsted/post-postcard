class PostcardsController < ApplicationController

    def create
        postcard = Postcard.create(postcard_params)
        render json: postcard
    end

    def index
        postcards = Postcard.all
        render json: postcards
    end

    def my_postcards
        postcards = Postcard.where(user_id: session[:user_id])
        render json: postcards
    end

    def destroy
        postcard = Postcard.find(params[:id])
        postcard.destroy
        head :no_content
    end

    private
     def postcard_params
        params.permit(:image_url, :user_id)
     end

end
