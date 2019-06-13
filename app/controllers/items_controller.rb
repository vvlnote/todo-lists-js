class ItemsController < ApplicationController

	def create
		@list = List.find(params[:list_id])
		@item = @list.items.build(item_params)
		@item.status = 0 #this item is incomplete
		if @item.save
			redirect_to list_path(@list)
		else
			render "lists/show"
		end
	end

	def update
		#raise params.inspect
		@list = List.find(params[:list_id])
		@item = Item.find(params[:id])
		#@item.update(item_params)
		@item.status = 1 #completed
		@item.save

		redirect_to list_path(@item.list)

	end

	private 

	def item_params
		params.require(:item).permit(:description, :status, :list_id)
	end
end