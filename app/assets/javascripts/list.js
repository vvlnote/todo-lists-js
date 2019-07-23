$(function() {
	console.log("our js file is actually loading!");
	listenClickHandlers();
	getItems();
	getLists();
	
	
})

let lists = [];
let items = [];

function listenClickHandlers() {
	console.log("in ListenClickHnadlers");
	$('#click-me').on('click', function(e){
		e.preventDefault();
		console.log('click detail button');
	});
	$(document).on('click', ".bDetail", function(e){
		e.preventDefault();
		console.log($(this).attr('data-id'));
		//console.log($(this).attr('data-id'));
		console.log('click on detail button');
	});

	$(document).on('click', ".show_detail", function(e) {
		e.preventDefault();
		console.log('click on show detail link, data-id = ', $(this).attr('data-id'));
		let id = $(this).attr('data-id');
		
		fetch(`/lists/${id}.json`)
			.then(res => res.json())
			.then(data => {
				
				let list = new List(data);
				let listItemsHTML = list.listItemsHTML();
				document.getElementsByClassName("show_items")[parseInt(id)-1].innerHTML = listItemsHTML;
			} );
	})
}
function getLists() {
	fetch(`lists.json`)
		.then(res => res.json())
		.then(data => {
			data.forEach(d => {
				console.log(d);
				let list = new List(d);
				let listHTML = list.listHTML();
				document.getElementsByClassName("todo-list")[0].innerHTML += listHTML;
			});
		});
}

function getItems() {
	console.log("in get Items");

	fetch(`items.json`)
		.then(res => res.json())
		.then(data => {
			data.forEach(d => {
				let item = new Item(d);
				items.push(item);
			});
		});
}


function displayListItems() {
	getListItems();
}

class List {
	constructor(object){
		this.id = object.id;
		this.list_items = object.list_items;
		this.name = object.name;
		this.user_id = object.user_id;
		this.items = object.items;
	}
};

// List.prototype.listHTML = function() {
// 	return (`<li><div class="view"><label>
// 		<a href="http://localhost:3000/lists/${this.id}">${this.name}</a></label>
// 		<form class="button_to" method="post" action="/lists/${this.id}"
// 		<input type="hidden" name="_method" value="delete">
// 		<input class="destroy" type="submit" value="X">
// 		</form></div></li>`);
// }

List.prototype.listHTML = function() {
	return (`<li><div class="view"><label>
			 <a href="/lists/${this.id}" data-id="${this.id}" class="show_detail">${this.name}</a>
			<button class="bDelete">X</button></label>
			</div>
			<div class="show_items"></div>
			</li>`);
}

List.prototype.listItemsHTML = function() {
	let itemsHTML = `<ul>`;
	this.items.forEach(item => {
		let itemHTML = `
			<li>${item.description}</li>`;
		itemsHTML += itemHTML;
	})
	itemsHTML += `</ul>`;
	return itemsHTML;
}


class ListItems {
	constructor(object) {
		this.id = object.id;
		this.list_id = object.list_id;
		this.item_id = object.item_id;
		this.status = object.status;
	}
}

class Item {
	constructor(object) {
		this.id = object.id;
		this.description = object.description;
	}
}