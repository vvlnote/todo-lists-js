class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  belongs_to :user
  has_many :list_items
  has_many :items, through: :list_items
  #has_many :items, serializer: ListItemSerializer
  
end
