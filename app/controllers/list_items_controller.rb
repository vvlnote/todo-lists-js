class ListItemsController < ApplicationController 

	def create
		binding.pry
		@list = List.find(params[:list_id])
		@item = Item.find(params[:list_item][:id])
		@list_item = ListItem.create(:list_id => params[:list_id], :item_id => params[:list_item][:id], :status=> 0)
		@items = Item.all
		#@item = @list.items.build(item_params)
		#@item.status = 0 #this item is incomplete
		if @list_item
			redirect_to list_path(@list)
		else
			render "lists/show"
		end
	end

	def update
		#raise params.inspect
		#binding.pry
		list_item = ListItem.find(params[:id])
		list_item.status = 1

		#@item.status = 1 #completed
		list_item.save

		redirect_to list_path(List.find(params[:list_id]))
	end

	def destroy
		#binding.pry
		listItem = ListItem.find(params[:id])
		list = List.find(listItem.list_id)
		listItem.destroy
		redirect_to list_path(list)
	end

	private 

	def list_item_params
		params.require(:list_item).permit(:list_id, :status, :item_id)
	end

end

