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
		let id = $(this).attr('data-id');
		let x = document.getElementsByClassName("show_items")[parseInt(id)-1];
		if (x.style.display === "block"){
			x.style.display = "none";

		} else {
			x.style.display = "block";
			fetch(`/lists/${id}.json`)
			.then(res => res.json())
			.then(data => {

				let list = new List(data);
				let listItemsHTML = list.listItemsHTML();
				document.getElementsByClassName("show_items")[parseInt(id)-1].innerHTML = listItemsHTML;
			} );
		}
		
	})

	$("#bNewList").on('click', function(e) {
		e.preventDefault();

	})
	// $("#item_input").on("keyup", function(e) {
	// 	e.preventDefault();
	// 	if (e.keyCode === 13) {
	// 		//go to display the new list
	// 		let value = document.getElementById('item_input').value;
	// 		let listItemHTML = `<li>${value}</li>`;
	// 		document.getElementById('list_items').innerHTML += listItemHTML;
	// 		document.getElementById('item_input').value = '';

	// 	}
	// })

	$("#new_list").on("submit", function(e) {
		e.preventDefault();
		const values = $(this).serialize();
		console.log(`${values}`);
		$.post("/lists", values).done(function(data){
			console.log(data);
			$("#app-container").html("");
			$("#app-container").html(`
				<h1> New List Name: ${data.name}`);
		});



		// let list_name = document.getElementById("list_name").value;
		// console.log(`${list_name}`);
		// const list_items = document.querySelectorAll('#list_items li');
		// console.log(list_items.length);
		// console.log(`${list_items[0].textContent}`);
		// postItems(list_items);

		

	})
	$("#add_item").on("click", function(e) {
		e.preventDefault();
		let value = document.getElementById('item_input').value;
		if (value.length > 0 ){
			let listItemHTML = `<li>${value}</li>`;
			document.getElementById('list_items').innerHTML += listItemHTML;
			document.getElementById('item_input').value = '';
		}
	})

}
function getLists() {
	console.log('get lists');
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
				console.log(d);
				let item = new Item(d);
				items.push(item);
			});
		});
}


function postItems(list_items) {
	console.log("in postItems");
	const url = "http://localhost:3000/items.json";
	list_items.forEach(item => {
		console.log(`${item.textContent}`);
		let data={
			description: `"${item.textContent}"`
		};
		$.post(url, data, function(data, status) {
			console.log(`${data} and status is ${status}`);
		});
	})

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
			<li>${item.description}
				<button class="item-complete">complete</button> 
			</li>`;
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