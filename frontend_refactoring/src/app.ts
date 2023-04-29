import { PageComponent, PageItemComponent } from './components/pages/page.js';
import { ImageComponent } from './components/pages/item/imageComponent.js';
import { VideoComponent } from './components/pages/item/VideoComponent.js';
import { NoteComponent } from './components/pages/item/NoteComponent.js';
import { TodoComponent } from './components/pages/item/TodoComponent.js';
import { InputDialog } from './components/dialog/dialog.js';

class App {
	private readonly page: PageComponent;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		const image = new ImageComponent();
		this.page.addChild(image);

		const video = new VideoComponent();
		this.page.addChild(video);

		const note = new NoteComponent();
		this.page.addChild(note);

		const todo = new TodoComponent();
		this.page.addChild(todo);

		const imageButton = document.querySelector(
			'#new-image'
		)! as HTMLButtonElement;
		imageButton.addEventListener('click', () => {
			const dialog = new InputDialog();

			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});
			dialog.setOnSubmitListener(() => {
				//section add
				dialog.removeFrom(document.body);
			});

			dialog.attachTo(document.body);
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement);
