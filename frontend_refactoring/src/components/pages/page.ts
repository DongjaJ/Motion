import { BaseComponent, Component } from '../Component.js';

export interface Composible {
	addChild(child: Component): void;
}

export type OnCloseListener = () => void;
export type DragState = 'start' | 'stop' | 'enter' | 'leave';
export type onDragListener<T extends Component> = (
	target: T,
	state: DragState
) => void;

export interface SectionContainer extends Component, Composible {
	setOnCloseListener(listener: OnCloseListener): void;
	setOnDragStateListener(listener: onDragListener<SectionContainer>): void;
	muteChildren(state: 'mute' | 'unmute'): void;
	getBoundingRect(): DOMRect;
	onDropped(): void;
}

type SectionContainerConstructor = {
	new (): SectionContainer;
};

export class PageItemComponent
	extends BaseComponent<HTMLElement>
	implements SectionContainer
{
	private closeListener?: OnCloseListener;
	private dragStateListener?: onDragListener<PageItemComponent>;

	constructor() {
		super(
			`<li draggable='true' class="page-item">
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
		this.element.addEventListener('dragstart', (event: DragEvent) => {
			this.onDragStart(event);
		});
		this.element.addEventListener('dragend', (event: DragEvent) => {
			this.onDragEnd(event);
		});
		this.element.addEventListener('dragenter', (event: DragEvent) => {
			this.onDragEnter(event);
		});
		this.element.addEventListener('dragleave', (event: DragEvent) => {
			this.onDragLeave(event);
		});
	}

	onDragStart(_: DragEvent) {
		this.notifyObservers('start');
		this.element.classList.add('lift');
	}
	onDragEnd(_: DragEvent) {
		this.notifyObservers('stop');
		this.element.classList.remove('lift');
	}
	onDragEnter(_: DragEvent) {
		this.notifyObservers('enter');
		this.element.classList.add('drop-area');
	}
	onDragLeave(_: DragEvent) {
		this.notifyObservers('leave');
		this.element.classList.remove('drop-area');
	}

	notifyObservers(state: DragState) {
		this.dragStateListener && this.dragStateListener(this, state);
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
	setOnDragStateListener(listener: onDragListener<SectionContainer>): void {
		this.dragStateListener = listener;
	}

	muteChildren(state: 'mute' | 'unmute'): void {
		if (state === 'mute') this.element.classList.add('mute-children');
		else this.element.classList.remove('mute-children');
	}

	getBoundingRect(): DOMRect {
		return this.element.getBoundingClientRect();
	}

	onDropped(): void {
		this.element.classList.remove('drop-area');
	}
}

export class PageComponent
	extends BaseComponent<HTMLUListElement>
	implements Composible
{
	private children = new Set<SectionContainer>();
	private dragTarget?: SectionContainer;
	private dropTarget?: SectionContainer;
	constructor(private pageItemConstructor: SectionContainerConstructor) {
		super(`<ul class="page"></ul>`);

		this.element.addEventListener('dragover', (event: DragEvent) => {
			this.onDragOver(event);
		});
		this.element.addEventListener('drop', (e: DragEvent) => {
			this.onDrop(e);
		});
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
	}

	onDrop(e: DragEvent) {
		e.preventDefault();
		if (!this.dropTarget) return;
		if (this.dragTarget && this.dragTarget !== this.dropTarget) {
			const dropY = e.clientY;
			const srcElement = this.dragTarget.getBoundingRect();

			this.dragTarget.removeFrom(this.element);
			this.dropTarget.attach(
				this.dragTarget,
				dropY < srcElement.y ? 'beforebegin' : 'afterend'
			);
		}
		this.dropTarget.onDropped();
	}
	addChild(section: Component) {
		const item = new this.pageItemConstructor();
		item.addChild(section);
		item.attachTo(this.element, 'beforeend');
		item.setOnCloseListener(() => {
			item.removeFrom(this.element);
			this.children.delete(item);
		});
		this.children.add(item);
		item.setOnDragStateListener((target: SectionContainer, state) => {
			switch (state) {
				case 'start':
					this.dragTarget = target;
					this.updateSections('mute');
					break;
				case 'stop':
					this.dragTarget = undefined;
					this.updateSections('unmute');
					break;
				case 'enter':
					this.dropTarget = target;
					break;
				case 'leave':
					this.dropTarget = undefined;
					break;
				default:
					throw new Error(`unsupported state: ${state}`);
			}
		});
	}

	updateSections(state: 'mute' | 'unmute') {
		this.children.forEach((section: SectionContainer) => {
			section.muteChildren(state);
		});
	}
}
