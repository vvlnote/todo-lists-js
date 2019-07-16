class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  belongs_to :user
  has_many :list_items
  
end
