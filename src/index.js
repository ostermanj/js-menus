import './styles.scss';
const dropdowns = document.querySelectorAll('.js-dropdown');
const openMenus = [];

function clickHandler(e){
	e.stopPropagation();
	this.openOptions(!this.isOpen);
}
function escapeHandler(e){
	if ( e.keyCode === 27 ){ // is escape
		closeMenus();
	}
}
function arrowHandler(e){
	var openMenuIndex = Array.from(dropdowns).indexOf(openMenus[0]);
	if ( e.keyCode === 37 && openMenuIndex > 0 ){ // left
		dropdowns[openMenuIndex - 1].openOptions(true);
	}
	if ( e.keyCode === 39 && openMenuIndex < dropdowns.length - 1 ){ // right
		dropdowns[openMenuIndex + 1].openOptions(true);
	}
}
function closeMenus(){
	openMenus.forEach(menu => {
		menu.openOptions(false)
	});
}
function openOptions(bool){
	if ( bool ){
		this.isOpen = true;
		this.options.classList.add('is-open');
		this.items.forEach(item => {
			item.setAttribute('tabindex', '0');
		});
		this.button.textContent = 'Close';
		this.button.focus();
		closeMenus();
		openMenus.push(this);
		document.body.addEventListener('click', closeMenus);
		document.body.addEventListener('keydown', arrowHandler);
	} else {
		openMenus.splice(openMenus.indexOf(this));
		this.isOpen = false;
		this.options.classList.remove('is-open');
		this.items.forEach(item => {
			item.setAttribute('tabindex', '-1');
		});
		this.button.textContent = this.text;
		document.body.removeEventListener('click', closeMenus);
		document.body.removeEventListener('keydown', arrowHandler);
	}
}
function initDropdown(){
	this.button = this.querySelector('button');
	this.options = this.querySelector('ul');
	this.items = this.querySelectorAll('li a');
	this.isOpen = false;
	this.openOptions = openOptions.bind(this);
	this.text = this.button.textContent.trim();

	this.button.addEventListener('click', clickHandler.bind(this));
}
dropdowns.forEach(dropdown => {
	document.body.addEventListener('keydown', escapeHandler);
	initDropdown.call(dropdown);
});