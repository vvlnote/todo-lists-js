class Item < ApplicationRecord
	#belongs_to :list
	has_many :list_items
	has_many :lists, through: :list_items

	validates :description, presence: true

	STATUS = {
		:incompleted => 0,
		:completed => 1
	}

	def completed?
		#binding.pry
		#self.status == STATUS[:completed]
		false
	end

	def incompleted?
		#binding.pry
		#if self.status == nil || self.status == STATUS[:incompleted] 
		#	true
		#else
		#	false
		#end
		false
	end
end
