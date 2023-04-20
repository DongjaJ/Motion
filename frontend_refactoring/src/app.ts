import { PageComponent } from './components/pages/page.js';
import { ImageComponent } from './components/pages/item/imageComponent.js';
import { VideoComponent } from './components/pages/item/VideoComponent.js';
import { NoteComponent } from './components/pages/item/NoteComponent.js';
import { TodoComponent } from './components/pages/item/TodoComponent.js';
class App {
	private readonly page: PageComponent;
	private readonly image: ImageComponent;
	private readonly video: VideoComponent;
	private readonly note: NoteComponent;
	private readonly todo: TodoComponent;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent();
		this.page.attachTo(appRoot);
		this.image = new ImageComponent();
		this.image.attachTo(appRoot, 'beforeend');
		this.video = new VideoComponent();
		this.video.attachTo(appRoot, 'beforeend');
		this.note = new NoteComponent();
		this.note.attachTo(appRoot, 'beforeend');
		this.todo = new TodoComponent();
		this.todo.attachTo(appRoot, 'beforeend');
	}
}

new App(document.querySelector('.document')! as HTMLElement);
