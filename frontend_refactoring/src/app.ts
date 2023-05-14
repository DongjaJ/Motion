import { PageComponent, PageItemComponent } from './components/pages/page.js';
import { ImageComponent } from './components/pages/item/imageComponent.js';
import { VideoComponent } from './components/pages/item/VideoComponent.js';
import { NoteComponent } from './components/pages/item/NoteComponent.js';
import { TodoComponent } from './components/pages/item/TodoComponent.js';
import {
	InputDialog,
	MediaData,
	TextData,
} from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { Component } from './components/Component.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
	new (): T;
};
class App {
	private readonly page: PageComponent;
	constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		this.bindElementToDialog(
			'#new-image',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new ImageComponent(input.title, input.url)
		);
		this.bindElementToDialog(
			'#new-video',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new VideoComponent(input.title, input.url)
		);
		this.bindElementToDialog(
			'#new-note',
			TextSectionInput,
			(input: TextSectionInput) =>
				new NoteComponent(input.title, input.body)
		);
		this.bindElementToDialog(
			'#new-todo',
			TextSectionInput,
			(input: TextSectionInput) =>
				new TodoComponent(input.title, input.body)
		);

		// For demo :)
		// this.page.addChild(
		// 	new ImageComponent('Image Title', 'https://picsum.photos/800/400')
		// );
		// this.page.addChild(
		// 	new VideoComponent('Video Title', 'https://youtu.be/TSI0vN6PjHI')
		// );
		// this.page.addChild(
		// 	new NoteComponent('Note Title', "Don't forget to code your dream")
		// );
		// this.page.addChild(
		// 	new TodoComponent('Todo Title', 'TypeScript Course!')
		// );
		// this.page.addChild(
		// 	new ImageComponent('Image Title', 'https://youtu.be/TSI0vN6PjHI')
		// );
		// this.page.addChild(
		// 	new VideoComponent('Video Title', 'https://youtu.be/TSI0vN6PjHI')
		// );
		// this.page.addChild(
		// 	new NoteComponent('Note Title', "Don't forget to code your dream")
		// );
		// this.page.addChild(
		// 	new TodoComponent('Todo Title', 'TypeScript Course!')
		// );
	}

	private bindElementToDialog<T extends (MediaData | TextData) & Component>(
		selector: string,
		InputComponent: InputComponentConstructor<T>,
		makeSection: (input: T) => Component
	) {
		const element = document.querySelector(selector)! as HTMLButtonElement;
		element.addEventListener('click', () => {
			const dialog = new InputDialog();
			const input = new InputComponent();
			dialog.addChild(input);
			dialog.attachTo(this.dialogRoot);
			dialog.setOnCloseListener(() => {
				dialog.removeFrom(this.dialogRoot);
			});
			dialog.setOnSubmitListener(() => {
				const content = makeSection(input);
				this.page.addChild(content);
				dialog.removeFrom(this.dialogRoot);
			});
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
