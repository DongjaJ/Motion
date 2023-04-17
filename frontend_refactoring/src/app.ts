import { PageComponent } from './components/page.js';
import { ImageComponent } from './components/imageConponent.js';
class App {
	private readonly page: PageComponent;
	private readonly image: ImageComponent;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent();
		this.page.attachTo(appRoot);
		this.image = new ImageComponent();
		this.image.attachTo(appRoot, 'beforeend');
	}
}

new App(document.querySelector('.document')! as HTMLElement);
