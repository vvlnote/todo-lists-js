class List < ApplicationRecord

	belongs_to :user
	has_many :list_items
	has_many :items, through: :list_items

	validates :name, presence: true
	
	scope :of_user, -> {where(:user_id => User.current_user.id)}


	
	def completed?
		false # this method is for usage of partials to avoid break the code
	end

end
