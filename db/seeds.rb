# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Item.create([{description: "Milk"}, {description: "Beef"}, {description: "Bread"}, 
	{description: "Jam"}, {description: "Walk Dog"}, {description: 'Do Laundry'},
	{description: "Feed Fish"}, {description: "Water Plant"}]);


List.create(name:"Weekday todo list", user_id: 1)
List.create(name:"Book List", user_id: 1)
List.create(name: "Shopping List", user_id: 1)


ListItem.create(list_id: 3, item_id: 1, status: 0)
ListItem.create(list_id: 3, item_id: 2, status: 0)
ListItem.create(list_id: 3, item_id: 3, status: 0)
ListItem.create(list_id: 3, item_id: 4, status: 0)


ListItem.create(list_id: 1, item_id: 5, status: 0)
ListItem.create(list_id: 1, item_id: 6, status: 0)
ListItem.create(list_id: 1, item_id: 7, status: 0)
ListItem.create(list_id: 1, item_id: 8, status: 0)