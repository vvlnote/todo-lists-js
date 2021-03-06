class ItemsController < ApplicationController

	def index
		items = Item.all
		render json: items

	end

	def create
		# binding.pry
		item = Item.new(item_params)
		if item.save
			render json: item
		end

	end

	private

	def item_params
		params.require(:item).permit(:description)
	end
end