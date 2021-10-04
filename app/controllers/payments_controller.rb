class PaymentsController < ApplicationController
    require 'stripe'
    Stripe.api_key = 'sk_test_51Jgvu1Ixf5MifhQmHZZM1o8nQiobcJkQ26eJJBnbCnnd1cTeCEOxE9E3h6iuezSbdO8KyLFSIIolVRsgC0mMPvRs00x7WgW293'
    skip_before_action :authorize

    def create
        
        payment_intent = Stripe::PaymentIntent.create(
            amount: params[:amount],
            currency: 'usd'
          )
          render json: {
            clientSecret: payment_intent['client_secret']
          }
     end
    

end
