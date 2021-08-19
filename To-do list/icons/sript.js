$(function() {
	
	function initialState() {
		if (localStorage.getItem('items') == null) {
			$('.list-empty').show();
		}
		else {			
			$('.items-list').html(localStorage.getItem('items'));
			$('.list-empty').hide();

		};
	};

	initialState();
	function addToStorage() {
		let content = $('.items-list').html();
		console.log(content);
		localStorage.setItem('items', content);
	};

	function addItem() {		
		let description = $('.form-description').val(),
			designation = $('.form-designation').val();			

		if (description.length !== 0 && designation.length !== 0) {
			$('.form-description').removeClass('error');
			$('.form-designation').removeClass('error');			

			$('.list-empty').hide();

			$('.items-list').append(`
				<div class="item">
					<div class="item-header">
						<div class="item-text">${designation}</div>
						<button class="item-delete"></button>
						<div class="status-select"></div>
					</div>
					<div class="item-description">${description}</div>				
				</div>	
			`);
			$('textarea').val('');
			addToStorage();
		}

		else {
			$('.form-description').addClass('error');
			$('.form-designation').addClass('error');}
		};

	function deleteItem(item) {
		item.remove();
		let itemList = $('.item');
		addToStorage();
		console.log(itemList.length);

		if (itemList.length == 0) {
			$('.list-empty').show();
			localStorage.removeItem('items');
		};
	};

	$('.form-append').on('click', addItem);
	$('body').on('click', '.item-delete', function(event){

		event.preventDefault();
		let item = $(this).parents('.item');
		deleteItem(item);		
	});
})