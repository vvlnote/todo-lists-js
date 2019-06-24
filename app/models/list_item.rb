class ListItem < ApplicationRecord
	belongs_to :list
	belongs_to :item

	#scope :completed?, -> {where(status: 1)}

	STATUS = {
		:incompleted => 0,
		:completed => 1
	}

	def self.get_items_of(list)
		list_items = []
		items = []
		list_items = self.get_list_items_of(list)
		items = list_items.map {|item| Item.find(item.item_id)}
	end

	def self.get_list_items_of(list)
		list_items =[]
		ListItem.all.each do |list_item|
			if list_item.list_id == list.id
				list_items << list_item
			end
		end
		list_items
	end

	def completed?
		self.status == STATUS[:completed]
	end

	def incompleted?
		self.status == STATUS[:incompleted]
	end

	def item_description(item_id)
		item = Item.find(item_id)
		item.description
	end
end
