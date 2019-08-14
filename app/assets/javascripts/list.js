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
	// console.log("in ListenClickHnadlers");
	// $('#click-me').on('click', function(e){
	// 	e.preventDefault();
	// 	console.log('click detail button');
	// });
	$(document).on('click', ".bDelete", function(e){
		e.preventDefault();

		let id = $(this).attr('data-id');
		//debugger;
		console.log(id);
		console.log('click on delete button');
		fetch(`/lists/${id}`, {method: 'DELETE'})
	    .then(res => {
	    	console.log("Deleted:", res);
	    	//debugger;
	    	//remove the deleted list from the list
	    	$(`#list_${id}`).remove();
	    })
    	.catch(err => console.error(err))
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
				debugger;
				let list = new List(data);
				let listItemsHTML = list.listItemsHTML();
				document.getElementById(`show_items_${id}`).innerHTML = listItemsHTML;
			} );
		}
		
	})

	$(document).on('click', ".item-complete", function(e){
		e.preventDefault();
		console.log(e);
		console.log('click on the complete button');
		const list_id = this.dataset.listid;
		const list_item_id = this.dataset.listitemid;
		const list_item = {status: 1};
		fetch(`/lists/${list_id}/list_items/${list_item_id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list_item)
		})
		.then(response => response.json())
		.then(data=> {
			debugger;
			console.log(data);
		})
		.catch(err => console.error(err))
		debugger;
		this.disabled = true;
		this.parentElement.style.textDecoration = "line-through";

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
			//debugger;
			addAListToLists(data);
			//push the list_Items into the db
			postNewListItem(data.id);
			})
		.catch(error => console.log(`Error: ${error.message}`));
	})

	$(document).on('click', "#add_item", function(e){
		e.preventDefault();
		console.log("click on add item button");
		let value = document.getElementById('item_input').value;

		console.log(value);
		if (value.length > 0 ){
			let selectedObj = $("#itemlist").find("option[value='" + value + "']");
			let listItemHTML = '';
			if (selectedObj.length > 0) {//this item is existed in db
				let id = selectedObj[0].dataset.id;
				listItemHTML = `<li data-id=${id}>${value}</li>`;
				document.getElementById('list_items').innerHTML += listItemHTML;
		 		document.getElementById('item_input').value = '';
			}
			else { //newly added item
				let item_data = {description: `${value}`};
				fetch('/items.json', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(item_data),
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
					listItemHTML = `<li data-id=${data.id}>${data.description}</li>`;
					document.getElementById('list_items').innerHTML += listItemHTML;
					//add the new item into the datalist
					let option = `<option value="${data.description}" data-id=${data.id}></option>`;
					document.getElementById('itemlist').innerHTML += option;
		 			document.getElementById('item_input').value = '';
					})
				.catch(error => console.log(`error: ${error.message}`));
			};
			
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
		//debugger;
		options += `<option value="${item.description}" data-id=${item.id}></option>`;
	});
	console.log(options);
	let section = document.getElementById('new-list-section');

	section.innerHTML = `<h1>New List</h1><br>`;
	//<form id="new_list" onsubmit="createList(); return false;">
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


function postNewListItem(list_id) {
	//get all the list items from ul id="list_items"
	const listItems = document.querySelectorAll('#list_items li');
	listItems.forEach(lItem => {
		let id = parseInt(lItem.dataset.id, 10);
		let d = {list_id: list_id, item_id: id, status: 0};
		debugger;
		fetch(`/lists/${list_id}/list_items.json`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(d),
				})
				.then(response => response.json())
				.then(data => {
					debugger;
					console.log(data);
					//clean up the new list form 
					document.getElementById('new-list-section').innerHTML = "";
					})
				.catch(error => console.log(`error: ${error.message}`));

	})
}
function getLists() {
	console.log('get lists');
	fetch(`/lists.json`)
		.then(res => res.json())
		.then(data => {
			data.forEach(d => {
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
	return (`<li id="list_${this.id}"><div class="view"><label>
			 <a href="#" data-id="${this.id}" class="show_detail">${this.name}</a>
			<button data-id="${this.id}" class="bDelete">X</button></label>
			</div>
			<div id="show_items_${this.id}"></div>
			</li>`);
}

List.prototype.listItemsHTML = function() {
	let itemsHTML = `<ul>`;
	this.items.forEach(item => {
		const listItem = this.list_items.find(lItem => lItem.item_id === item.id);
		const disabled = listItem.status ? true: false;
		let itemHTML = "";
		if (disabled) {
			itemHTML = `
			<li style="text-decoration:line-through;">${item.description}
				<button data-listId="${this.id}" data-listItemId="${listItem.id}" class="item-complete" disabled>complete</button> 
			</li>`;
			
		}
		else {
			itemHTML = `
			<li >${item.description}
				<button data-listId="${this.id}" data-listItemId="${listItem.id}" class="item-complete">complete</button> 
			</li>`;
		}
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