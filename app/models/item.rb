class Item < ApplicationRecord
	belongs_to :list

	validates :description, presence: true

	STATUS = {
		:incompleted => 0,
		:completed => 1
	}

	def completed?
		#binding.pry
		self.status == STATUS[:completed]
	end

	def incompleted?
		#binding.pry
		if self.status == nil || self.status == STATUS[:incompleted] 
			true
		else
			false
		end
	end
end
