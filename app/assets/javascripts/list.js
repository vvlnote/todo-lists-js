$(function() {
	console.log("our js file is actually loading!");
	listenClickHandlers();
	getItems();
	getLists();
	
	
})

let lists = [];
let items = [];
const BASE_URL="http://localhost:3000";

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
		let x = document.getElementById(`show_items_${id}`);
		if (x.style.display === "block"){
			x.style.display = "none";

		} else {
			x.style.display = "block";
			fetch(`/lists/${id}.json`)
			.then(res => res.json())
			.then(data => {

				let list = new List(data);
				let listItemsHTML = list.listItemsHTML();
				//document.getElementsByClassName("show_items")[parseInt(id)-1].innerHTML = listItemsHTML;
				document.getElementById(`show_items_${id}`).innerHTML = listItemsHTML;
			} );
		}
		
	})
	$(document).on('submit', "#new_list", function(e){
		console.log('click on submit');
		e.preventDefault();
		let newListId = 0;
		let item_values = document.getElementById('list_items').getElementsByTagName("li");

		if (item_values.length){console.log(item_values[0].textContent);}
		
		//post the list name to the the list id
		let list_data = {name: document.getElementById('listname').value};

		fetch(`/lists.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list_data)
		})
		.then(response => response.json())
		.then(data => {
			debugger;
			// let newList = new List(data);
			// let listHTML = newList.listHTML();
			// document.getElementsByClassName("todo-list")[0].innerHTML += listHTML;
			addAListToLists(data);
			console.log(data)})

		.catch(error => console.log(`Error: ${error.message}`));

		let item_data = {description: "Apples"};
		// fetch('http://localhost:3000/items.json', {
		// 	method: 'POST',
		// 	credentials: 'omit',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(item_data),
		// })
		// .then(response => response.json())
		// .then(data => console.log(data))
		// .catch(error => console.log(`error: ${error.message}`));
		debugger;
				//const values = $(this).serialize();
		//console.log(`${values}`);
		// $.post("/lists", values).done(function(data){
		// 	console.log(data);
		// 	$("#app-container").html("");
		// 	$("#app-container").html(`
		// 		<h1> New List Name: ${data.name}`);
		// });
		
		//clean up the HTML
		document.getElementById('new-list-section').innerHTML = "";
	})

	$(document).on('click', "#add_item", function(e){
		debugger;

		e.preventDefault();
		console.log("click on add item button");
		let value = document.getElementById('item_input').value;
		console.log(value);
		if (value.length > 0 ){
			let listItemHTML = `<li>${value}</li>`;
			document.getElementById('list_items').innerHTML += listItemHTML;
		 	document.getElementById('item_input').value = '';
		}
	});

	$("#new-list-link").on("click", function(e) {
		console.log('click on the new-list-link');
		e.preventDefault();
		buildANewListForm();
	
	})

}

function buildANewListForm() {

	console.log('in buildANewListForm');
	//build the datalist to display the existing items
	let options = '';
	items.forEach((item) => {
		options += `<option value="${item.description}"></option>`;
	});
	console.log(options);
	let section = document.getElementById('new-list-section');

	section.innerHTML = `<h1>New List</h1><br>`;
	let formElement = `
		<form id="new_list" action='#'>
		<label>New List Name: </label>
		<input type="text" id="listname" name="listname" value=''>
		<br>
		<input type="text" id="item_input" list="itemlist">
		<button id="add_item">Add Item</button>
		<br>
		<ul id="list_items">
		</ul>
		<input type='submit' value="Add new list">
		</form>
	`;
	let dataListHTML = `<datalist id="itemlist">${options}</datalist>`;

	section.innerHTML += formElement;
	section.innerHTML += dataListHTML;

}
function getLists() {
	console.log('get lists');
	fetch(`/lists.json`)
		.then(res => res.json())
		.then(data => {
			data.forEach(d => {
				//debugger;
				//console.log(d);
				// let list = new List(d);
				// let listHTML = list.listHTML();
				// document.getElementsByClassName("todo-list")[0].innerHTML += listHTML;
				addAListToLists(d);
			});
		});
}

function getItems() {
	console.log("in get Items");

	fetch(`items.json`)
		.then(res => res.json())
		.then(data => {
			data.forEach(d => {
				//console.log(d);
				let item = new Item(d);
				items.push(item);
			});
		});
}

function addAListToLists(data) {
	let list = new List(data);
	let listHTML = list.listHTML();
	let listsHTML =  document.getElementsByClassName("todo-list")[0].innerHTML;
	document.getElementsByClassName("todo-list")[0].innerHTML = listHTML + listsHTML;
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



List.prototype.listHTML = function() {
	return (`<li><div class="view"><label>
			 <a href="#" data-id="${this.id}" class="show_detail">${this.name}</a>
			<button class="bDelete">X</button></label>
			</div>
			<div id="show_items_${this.id}"></div>
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

	itemDisplayInItemList() {
		return(
			`<option value={this.description}`
			);
	}
}