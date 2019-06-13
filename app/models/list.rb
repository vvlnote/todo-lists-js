class List < ApplicationRecord

	belongs_to :user
	has_many :items

	validates :name, presence: true

	def completed?
		false # this method is for usage of partials to avoid break the code
	end

end
