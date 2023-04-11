import ModalImpl from './Modal.js';
interface TodoList {
	setEvent(): void;
}

class TodoListImpl implements TodoList {
	constructor(private $target: HTMLElement, private modal: ModalImpl) {
		this.setEvent();
	}

	setEvent() {
		//버튼 클릭했을 때 모달창 activate
		this.$target.addEventListener('click', (e) => {
			const target = e.target;
			if (!(target instanceof HTMLButtonElement)) return;
			const contentType = target.id;
			this.modal.setContentType(contentType);
			this.modal.toggleModal();
		});
	}
}

const modalTarget = document.querySelector('.modal') as HTMLElement;
const modal = new ModalImpl(modalTarget);
const todolist = document.querySelector('.todo__list') as HTMLElement;
new TodoListImpl(todolist, modal);
