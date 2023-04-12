import { ContentType } from '../main';

type TemplateParam = {
	title: string;
	content: String;
};

export function makeNoteTemplate({
	title,
	content,
}: Partial<TemplateParam>): string {
	return `
	<div class="todo__list__item Note">
		<div class="item_content">
			<div class="title">${title}</div>
			<div class="content">${content}</div>
		</div>
		<div class="delete_button">x</div>
	</div>`;
}
