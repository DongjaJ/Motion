import { BaseComponent } from './Component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
	constructor(
		title: string = 'title',
		url: string = 'https://newsimg.sedaily.com/2022/12/16/26EXCQU873_1.jpg'
	) {
		super(`
		<section class ='image'>
				<div class ='image__holder'>
					<img class ='image__thumbnail'>
				</div>
				<p class ='image__title'></p>
			</section>
		`);

		const imageElement = this.element.querySelector(
			'.image__thumbnail'
		)! as HTMLImageElement;
		imageElement.src = url;
		imageElement.alt = title;

		const titleElement = this.element.querySelector(
			'.image__title'
		)! as HTMLParagraphElement;
		titleElement.textContent = title;
	}
}
