class ListsController <ApplicationController


	def index
		
		@lists = List.where(:user_id => current_user.id)
		@list_items = get_all_list_items(@lists)
		@items = get_all_items(@lists)
		@username = current_user.username
		if @username.empty?
			@username = current_user.email
		end
		@new_list = List.new
		respond_to do |f|
			f.html {render :index}
			f.json {render json: @lists}
		end
	end

	def show
		@list = List.find(params[:id])
		@list_item = ListItem.new
		@list_items = ListItem.get_list_items_of(@list)
		@items = Item.all
		respond_to do |f|
			f.html {render :show}
			f.json {render json: @list}
		end
	end

	def create
		@new_list = List.new
		@new_list.name = params[:list][:name]
		@new_list.user = current_user
		if @new_list.save
			respond_to do |f|
				f.html {redirect_to list_path(@new_list)}
				f.json {render json: @lists}
			end
			#redirect_to list_path(@new_list)
		else
			@lists = List.where(:user_id => current_user.id)
			#binding.pry
			@items = get_all_items(@lists)
			#binding.pry
			@list_items = get_all_list_items(@lists)
			@username = current_user.username
			if @username.empty?
				@username = current_user.email
			end
			render :index
		end

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
		params.require(:list).permit(:name, :description, :user_id)
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
