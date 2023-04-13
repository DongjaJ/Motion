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

document.body.ondragstart = function () {
	return false;
};

const checkDropable = (e: MouseEvent, copy_item: HTMLElement) => {
	copy_item.hidden = true;
	let elemBelow = document.elementFromPoint(
		e.clientX,
		e.clientY
	) as HTMLElement;
	copy_item.hidden = false;
	if (!elemBelow) return;
	console.log(elemBelow);
	return elemBelow;
};

function getDragAfterElement(container: HTMLElement, y: number) {
	const draggableElements = [
		...container.querySelectorAll('.todo__list__item'),
	];
	const dragAfterElement: { offset: number; element?: HTMLElement } =
		draggableElements.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = y - box.top - box.height / 2;
				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY }
		);

	console.log(dragAfterElement);

	return dragAfterElement?.element;
}

const getShift = (e: MouseEvent, origin_item: HTMLElement) => {
	const shiftX = e.clientX - origin_item.getBoundingClientRect().left;
	const shiftY = e.clientY - origin_item.getBoundingClientRect().top;
	return { shiftX, shiftY };
};

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

		this.$target.addEventListener('mousedown', (e) => {
			//drag start
			const drag_delay = 150;
			let isClick = 1;
			const timer = setTimeout(() => {
				if (!isClick) return;
				isClick = 0;
				this.excuteDrag(e, this.$target);
			}, drag_delay);

			document.onmouseup = () => {
				clearTimeout(timer);
				isClick = 0;
			};
		});
	}

	dragStart() {
		// copyItem.classList.toggle('dragging');
		// todoList.append(copyItem);
		// originItem.classList.toggle('dragged');
	}

	excuteDrag(e: MouseEvent, todoList: HTMLElement) {
		let prevdragAfterElement: HTMLElement | null = null;
		const target = e.target as HTMLElement;
		const originItem = target.closest('.todo__list__item') as HTMLElement;
		if (!originItem) return;

		console.log('dragStart');
		const { shiftX, shiftY } = getShift(e, originItem);
		const copyItem = originItem.cloneNode(true) as HTMLElement;
		let elemBelow = document
			.elementFromPoint(e.clientX, e.clientY)
			?.closest('.todo__list__items');
		console.log(elemBelow);
		copyItem.classList.toggle('dragging');
		document.body.append(copyItem);
		originItem.classList.toggle('dragged');

		//mouse 이동시 이벤트
		document.addEventListener('mousemove', onMouseMove);

		document.onmouseup = dragEndEvent;

		function moveAt(pageX: number, pageY: number) {
			copyItem.style.left = pageX - shiftX + 'px';
			copyItem.style.top = pageY - shiftY + 'px';
		}

		function onMouseMove(e: MouseEvent) {
			moveAt(e.pageX, e.pageY);
			const todolistItems = checkDropable(e, copyItem)?.closest(
				'.todo__list__items'
			) as HTMLElement;
			if (!(todolist instanceof HTMLElement)) {
				prevdragAfterElement?.classList.toggle('afterDrag');
				prevdragAfterElement = null;
				return;
			}
			const afterElement = getDragAfterElement(todolist, e.clientY);

			if (!afterElement) {
				prevdragAfterElement?.classList.toggle('afterDrag');
				prevdragAfterElement = null;
				return;
			}
			console.log(afterElement);
			if (afterElement === prevdragAfterElement) return;
			if (prevdragAfterElement)
				prevdragAfterElement.classList.toggle('afterDrag');
			afterElement?.classList.toggle('afterDrag');
			prevdragAfterElement = afterElement;
		}

		function dragEndEvent() {
			document.removeEventListener('mousemove', onMouseMove);
			const todoListItems = todoList.querySelector(
				'.todo__list__items'
			) as HTMLElement;
			if (prevdragAfterElement) {
				prevdragAfterElement.classList.toggle('afterDrag');
				todoListItems.insertBefore(originItem, prevdragAfterElement);
			}

			copyItem.remove();
			originItem.classList.toggle('dragged');
		}
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
		this.modal.InitialModal();
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
