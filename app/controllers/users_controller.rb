class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :profile_pic)
    end
end
