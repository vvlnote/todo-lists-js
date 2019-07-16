class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :list_id, :item_id, :status

  belongs_to :list
  belongs_to :item
end
