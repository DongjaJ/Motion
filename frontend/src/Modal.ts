import { Modal } from './interface/interface';
import { ContentType } from './main';

class ModalImpl implements Modal {
	constructor(
		private $target: HTMLElement,
		private $contentType?: ContentType
	) {
		this.setEvent();
	}
	setEvent() {
		this.$target.addEventListener('click', (e) => {
			const $target = e.target as HTMLElement;
			const cancelButton = $target?.closest('.cancel-modal-btn');
			if (!cancelButton) return;
			this.toggleModal();
			this.InitialModal();
		});
	}
	setContentType(contentType: ContentType): void {
		this.$contentType = contentType;
		this.setContent();
	}
	get contentType() {
		return this.$contentType;
	}
	InitialModal() {
		const title = this.$target.querySelector(
			`input[name="title"]`
		) as HTMLInputElement;
		const content = this.$target.querySelector(
			'input[name="content"]'
		) as HTMLInputElement;

		title.value = content.value = '';
	}
	toggleModal() {
		this.$target.classList.toggle('active_modal');
	}
	setContent() {
		const bodyTitle = this.$target.querySelector(
			'.content h3'
		) as HTMLElement;
		if (this.$contentType === 'Image' || this.$contentType === 'Video')
			bodyTitle.innerHTML = 'URL';
		else bodyTitle.innerHTML = 'Body';
	}
}

export default ModalImpl;
