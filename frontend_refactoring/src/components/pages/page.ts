import { BaseComponent, Component } from '../Component.js';

export interface Composible {
	addChild(child: Component): void;
}

export type OnCloseListener = () => void;

export interface SectionContainer extends Component, Composible {
	setOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
	new (): SectionContainer;
};

export class PageItemComponent
	extends BaseComponent<HTMLElement>
	implements SectionContainer
{
	private closeListener?: OnCloseListener;
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
			this.closeListener && this.closeListener();
		});
	}
	addChild(child: Component) {
		const container = this.element.querySelector(
			'.page-item__body'
		)! as HTMLElement;
		child.attachTo(container);
	}
	setOnCloseListener(listener: OnCloseListener) {
		this.closeListener = listener;
	}
}

export class PageComponent
	extends BaseComponent<HTMLUListElement>
	implements Composible
{
	constructor(private pageItemConstructor: SectionContainerConstructor) {
		super(`<ul class="page"></ul>`);
	}

	addChild(section: Component) {
		const item = new this.pageItemConstructor();
		item.addChild(section);
		item.attachTo(this.element, 'beforeend');
		item.setOnCloseListener(() => {
			item.removeFrom(this.element);
		});
	}
}
