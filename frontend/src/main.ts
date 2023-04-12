import ModalImpl from './Modal.js';
import {
	makeImageTemplate,
	makeVideoTemplate,
	makeMemoTemplate,
	makeNoteTemplate,
} from './template/ListItem.js';
interface TodoList {
	setEvent(): void;
}

export type ContentType = 'Image' | 'Video' | 'Note' | 'Memo';

class TodoListImpl implements TodoList {
	constructor(private $target: HTMLElement, private modal: ModalImpl) {
		this.setEvent();
	}

	setEvent() {
		//버튼 클릭했을 때 모달창 activate
		this.$target.addEventListener('click', (e) => {
			this.modalAddEvent(e);
			this.deleteItemEvent(e);
			this.addEvent(e);
		});
	}

	addEvent(e: Event) {
		const target = e.target as HTMLElement;
		const buttonContainer = target.closest('.button__container');
		if (!(target instanceof HTMLButtonElement && buttonContainer)) return;
		const contentType = target.id as ContentType;
		this.modal.setContentType(contentType);
		this.modal.toggleModal();
	}

	modalAddEvent(e: Event) {
		const target = e.target as HTMLElement;
		const addButton = target.closest('.add-item-btn');
		if (!addButton) return;

		const title = this.$target.querySelector(
			`input[name="title"]`
		) as HTMLInputElement;
		const content = this.$target.querySelector(
			'input[name="content"]'
		) as HTMLInputElement;
		const titleValue = title.value;
		const contentValue = content.value;

		const contentTemplate = this.makeItemTemplate({
			contentType: this.modal.contentType,
			title: titleValue,
			content: contentValue,
		});

		makeNoteTemplate({
			title: titleValue,
			content: contentValue,
		});

		const todoListItems = this.$target.querySelector('.todo__list__items');
		todoListItems?.insertAdjacentHTML('beforeend', contentTemplate);
		this.modal.toggleModal();
	}

	makeItemTemplate({
		contentType,
		title,
		content,
	}: {
		contentType?: ContentType;
		title: string;
		content: string;
	}) {
		if (contentType === 'Image')
			return makeImageTemplate({ title, content });
		if (contentType === 'Video')
			return makeVideoTemplate({ title, content });
		if (contentType === 'Note') return makeNoteTemplate({ title, content });
		return makeMemoTemplate({ title, content });
	}

	deleteItemEvent(e: Event) {
		const target = e.target as HTMLElement;
		const deleteButton = target.closest('.delete_button');
		if (!deleteButton) return;
		const item = deleteButton.closest('.todo__list__item');
		item?.remove();
	}
}

const modalTarget = document.querySelector('.modal') as HTMLElement;
const modal = new ModalImpl(modalTarget);
const todolist = document.querySelector('.todo__list') as HTMLElement;
new TodoListImpl(todolist, modal);
