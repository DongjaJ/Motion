import { BaseComponent } from '../../Component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
	constructor(title: string = 'Todo title', todo: string = 'Todo Body') {
		super(`
		<section class ='todo'>
			<h2 class = 'todo__title'></h2>
			<input type ='checkbox' class ='todo-checkbox'>
			<p class = 'todo__body'></p>
		</section>
		`);

		const titleElement = this.element.querySelector(
			'.todo__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;

		const todoElement = this.element.querySelector(
			'.todo-checkbox'
		)! as HTMLInputElement;
		todoElement.insertAdjacentHTML('afterend', todo);
	}
}
