import { BaseComponent } from '../../Component.js';

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
				<h2 class ='page-item__title image__title'></h2>
			</section>
		`);

		const imageElement = this.element.querySelector(
			'.image__thumbnail'
		)! as HTMLImageElement;
		imageElement.src = url;
		imageElement.alt = title;

		const titleElement = this.element.querySelector(
			'.image__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;
	}
}
