export class ImageComponent {
	private element: HTMLElement;
	constructor() {
		this.element = document.createElement('section');
		this.element.setAttribute('class', 'Image');

		const image = document.createElement('img') as HTMLImageElement;
		image.setAttribute(
			'src',
			'https://newsimg.sedaily.com/2022/12/16/26EXCQU873_1.jpg'
		);
		image.setAttribute('width', '200');
		image.setAttribute('height', '200');

		this.element.appendChild(image);
		const title = document.createElement('p');
		title.textContent = 'My title';
		this.element.appendChild(title);
	}

	attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
		parent.insertAdjacentElement(position, this.element);
	}
}
