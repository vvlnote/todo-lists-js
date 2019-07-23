class ItemSerializer < ActiveModel::Serializer
  attributes :id, :description

  has_many :list_items
  has_many :lists, through: :list_items
  #has_many :lists, serializer: ListItemSerializer
  
end
