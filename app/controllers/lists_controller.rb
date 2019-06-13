class ListsController <ApplicationController


	def index
		@lists = List.where(:user_id => current_user.id)
		@items = get_all_items(@lists)
		@username = current_user.username
		if @username.empty?
			@username = current_user.email
		end
		@new_list = List.new
	end

	def show
		@list = List.find(params[:id])
		@item = Item.new
	end

	def create
		@new_list = List.new
		@new_list.name = params[:list][:name]
		@new_list.user = current_user
		if @new_list.save
			redirect_to list_path(@new_list)
		else
			@lists = List.where(:user_id => current_user.id)
			@items = get_all_items(@lists)
			render :index
		end

	end

	def destroy
		list = List.find(params[:id])
		list.items.clear
		list.destroy
		redirect_to lists_path
	end

	private

	def list_params
		params.require(:list).permit(:name, :description, :user_id)
	end

	def get_all_items(lists)
		items = []
		@lists.each do |list|
			items << list.items
		end
		items.flatten
	end
end
