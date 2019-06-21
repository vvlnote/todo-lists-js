class ListItemsController < ApplicationController 

	def create
		
		@list = List.find(params[:list_id])
		item_description = params[:list_item][:item_id]
		
		if item_description == "" || item_description == nil
			redirect_to list_path(@list)
		else
			@item = Item.find_by(:description => item_description)
			if !@item 
				@item = Item.create(:description => item_description)
			end

			@list_item = ListItem.create(:list_id => params[:list_id], :item_id => @item.id, :status=> 0)

			@items = Item.all

			if @list_item
				redirect_to list_path(@list)
			else
				render "lists/show"
			end
		end
	end

	def update

		list_item = ListItem.find(params[:id])
		list_item.status = 1

		list_item.save

		redirect_to list_path(List.find(params[:list_id]))
	end

	def destroy

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

