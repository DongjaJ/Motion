import { BaseComponent, Component } from '../Component.js';
import { Composible } from '../pages/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog
	extends BaseComponent<HTMLElement>
	implements Composible
{
	closeListener?: OnCloseListener;
	submitListener?: OnSubmitListener;

	constructor() {
		super(`<dialog class="dialog">
		<div class='dialog__container'>
		<button class="close">&times;</button>
		<div id="dialog__body"></div>
		<button class="dialog__submit">ADD</button>
		</div>
	</dialog>`);

		const closeButton = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		closeButton.onclick = () => {
			this.closeListener && this.closeListener();
		};

		const submitButton = this.element.querySelector(
			'.dialog__submit'
		)! as HTMLButtonElement;
		submitButton.onclick = () => {
			this.submitListener && this.submitListener();
		};
	}

	setOnCloseListener(listener: OnCloseListener) {
		this.closeListener = listener;
	}
	setOnSubmitListener(listener: OnSubmitListener) {
		this.submitListener = listener;
	}

	addChild(child: Component): void {
		const body = this.element.querySelector(
			'#dialog__body'
		)! as HTMLElement;
		child.attachTo(body);
	}
}
