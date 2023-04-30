import { PageComponent, PageItemComponent } from './components/pages/page.js';
import { ImageComponent } from './components/pages/item/imageComponent.js';
import { VideoComponent } from './components/pages/item/VideoComponent.js';
import { NoteComponent } from './components/pages/item/NoteComponent.js';
import { TodoComponent } from './components/pages/item/TodoComponent.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';

class App {
	private readonly page: PageComponent;
	constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		// const image = new ImageComponent();
		// this.page.addChild(image);

		// const video = new VideoComponent();
		// this.page.addChild(video);

		// const note = new NoteComponent();
		// this.page.addChild(note);

		// const todo = new TodoComponent();
		// this.page.addChild(todo);

		const imageButton = document.querySelector(
			'#new-image'
		)! as HTMLButtonElement;
		imageButton.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new MediaSectionInput();
			dialog.addChild(inputSection);
			dialog.attachTo(dialogRoot);
			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});
			dialog.setOnSubmitListener(() => {
				const image = new ImageComponent(
					inputSection.title,
					inputSection.url
				);
				this.page.addChild(image);
				dialog.removeFrom(dialogRoot);
			});
		});

		const videoButton = document.querySelector(
			'#new-video'
		)! as HTMLButtonElement;
		videoButton.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new MediaSectionInput();
			dialog.addChild(inputSection);
			dialog.attachTo(dialogRoot);
			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});
			dialog.setOnSubmitListener(() => {
				const image = new VideoComponent(
					inputSection.title,
					inputSection.url
				);
				this.page.addChild(image);
				dialog.removeFrom(dialogRoot);
			});
		});

		const noteButton = document.querySelector(
			'#new-note'
		)! as HTMLButtonElement;
		noteButton.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new TextSectionInput();
			dialog.addChild(inputSection);
			dialog.attachTo(dialogRoot);
			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});
			dialog.setOnSubmitListener(() => {
				const image = new NoteComponent(
					inputSection.title,
					inputSection.body
				);
				this.page.addChild(image);
				dialog.removeFrom(dialogRoot);
			});
		});

		const todoButton = document.querySelector(
			'#new-todo'
		)! as HTMLButtonElement;
		todoButton.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new TextSectionInput();
			dialog.addChild(inputSection);
			dialog.attachTo(dialogRoot);
			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});
			dialog.setOnSubmitListener(() => {
				const image = new TodoComponent(
					inputSection.title,
					inputSection.body
				);
				this.page.addChild(image);
				dialog.removeFrom(dialogRoot);
			});
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
