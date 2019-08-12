class ListsController <ApplicationController


	def index
		
		@lists = current_user.lists
		@user = current_user
		if @user.username.empty?
			@user.username = @user.email
		end
		respond_to do |f|
			f.html {render :index}
			#binding.pry
			f.json {render json: @lists}
		end
	end

	def show
		@list = List.find(params[:id])
		@list_item = ListItem.new
		@list_items = ListItem.get_list_items_of(@list)
		@items = Item.all
		respond_to do |f|
			f.html
			f.json {render json: @list}
		end
	end

	def create
		params[:list][:user_id] = current_user.id
		binding.pry
		@new_list = List.new(list_params)
		if @new_list.save
			render json: @new_list
		else
			redirect :index
		end


	end

	def new
		@list = List.new
		@items = Item.all
	end


	def destroy
		list = List.find(params[:id])
		list.items.clear
		list.destroy
		respond_to do |f|
			f.html {redirect_to lists_path}
			f.json {head :no_content}
		end
		#redirect_to lists_path
	end

	private

	def list_params
		params.require(:list).permit(:name, :user_id)
	end

	def get_all_list_items(lists)
		items = []

		lists.each do |list|
			items << ListItem.get_list_items_of(list)
		end
		items.flatten
	end

	def get_all_items(lists)
		items = []

		lists.each do |list|
			items << ListItem.get_items_of(list)
		end
		items.flatten
	end


end
