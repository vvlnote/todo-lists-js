class ItemsController < ApplicationController

	def index
		@items = Item.all
		respond_to do |f|
			f.json {render json: @items}
		end
	end

	def create
		
	end
end