import { BaseComponent } from '../../Component.js';

// <iframe
// width="790"
// height="444"
// src="https://www.youtube.com/embed/ftEWG7HGGKY"
// title="오랜만에 K리그 현장 중계 나가서 신난 깍쟁이 | 서울 vs 대구 vlog"
// frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// allowfullscreen>
// </iframe>

export class VideoComponent extends BaseComponent<HTMLElement> {
	constructor(
		title: string = 'my video',
		url: string = 'https://www.youtube.com/watch?v=ftEWG7HGGKY'
	) {
		super(`	<section class="video">
					<div class="video__player">
					<iframe class="video__iframe"></iframe>
					</div>
				<h3 class="page-item__title video__title"></h3>
		</section>
		`);

		const iframe = this.element.querySelector(
			'.video__iframe'
		)! as HTMLIFrameElement;
		iframe.src = this.convertToEmbeddedURL(url);
		url;

		const titleElement = this.element.querySelector(
			'.video__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;
	}
	private convertToEmbeddedURL(url: string): string {
		const regExp =
			/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
		const match = url.match(regExp);
		const videoId = match ? match[1] || match[2] : undefined;
		if (videoId) return `https://www.youtube.com/embed/${videoId}`;
		return url;
	}
}
