import { PageComponent, PageItemComponent } from './components/pages/page.js';
import { ImageComponent } from './components/pages/item/imageComponent.js';
import { VideoComponent } from './components/pages/item/VideoComponent.js';
import { NoteComponent } from './components/pages/item/NoteComponent.js';
import { TodoComponent } from './components/pages/item/TodoComponent.js';
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
	}
}

new App(document.querySelector('.document')! as HTMLElement);
