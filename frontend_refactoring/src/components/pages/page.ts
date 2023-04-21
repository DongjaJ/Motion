import { BaseComponent, Component } from '../Component.js';

export interface Composible {
	addChild(child: Component): void;
}

export class PageItemComponent
	extends BaseComponent<HTMLElement>
	implements Composible
{
	constructor() {
		super(
			`<li class="page-item">
				<section class="page-item__body"></section>
				<div class="page-item__controls">
				<button class="close">&times;</button>
				</div>
			</li>`
		);
		const closeButton = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		closeButton.addEventListener('click', () => {
			const item = this.element.closest(
				'.page-item'
			)! as HTMLUListElement;
			item.remove();
		});
	}
	addChild(child: Component) {
		const container = this.element.querySelector(
			'.page-item__body'
		)! as HTMLElement;
		child.attachTo(container);
	}
}

export class PageComponent
	extends BaseComponent<HTMLUListElement>
	implements Composible
{
	constructor() {
		super(`<ul class="page"></ul>`);
	}

	addChild(section: Component) {
		const item = new PageItemComponent();
		item.addChild(section);
		item.attachTo(this.element, 'beforeend');
	}
}
