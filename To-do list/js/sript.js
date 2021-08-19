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

	function clipDesignation (designation){
		designation = designation.substring(0, 45);
		var lastIndex = designation.lastIndexOf(" ");       // позиция последнего пробела
		designation = designation.substring(0, lastIndex) + '...'; // обрезаем до последнего слова
		console.log(designation.length)
		  
		return designation;
	};

	function addItem() {	
	
		let description = $('.form-description').val(),
			designation = $('.form-designation').val();

		if (description.length !== 0 && designation.length !== 0) {

			$('.form-description').removeClass('error');
			$('.form-designation').removeClass('error');			

			$('.list-empty').hide();

			if (designation.length >= 45) {
				designation = clipDesignation(designation);   	
		  	};
		  
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

	function collapseItem(select){
		let description = select.parents('.item-header').next();
		if (description.is(':visible')){
			description.hide();						
			select.addClass('active');
			addToStorage();
		}
		else {
			description.show();		
			select.removeClass('active');
			addToStorage();
		};
	};
	

	$('.form-append').on('click', function(event){
		event.preventDefault(); addItem();
	});


	$('body').on('click', '.item-delete', function(event){

		event.preventDefault();
		let item = $(this).parents('.item');
		deleteItem(item);		
	});


	$('body').on('click', '.status-select', function(){
		let select = $(this);
		console.log(select);
		collapseItem(select);
	});
})

