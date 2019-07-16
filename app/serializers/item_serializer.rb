class ItemSerializer < ActiveModel::Serializer
  attributes :id, :description

  has_many :list_items
  
end
