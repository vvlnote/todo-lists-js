class ListsController <ApplicationController

	
	def index
		@lists = List.where(:user_id => current_user.id)
		@items = []
		#@lists.each do |list|
		#	list.items.each do |item|
		#		@items << item
		#	end
		#end
		@lists.each do |list|
			@items << list.items
		end
		@items = @items.flatten
		@new_list = List.new
	end

	def show
		@list = List.find(params[:id])
	end

	def create
		@list = List.new
		@list.name = params[:list][:name]
		@list.user = current_user
		@list.save
		redirect_to list_path(@list)
	end

	private

	def list_params
		params.require(:list).permit(:name, :description, :user_id)
	end
end
