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

export function makeImageTemplate({
	title,
	content,
}: Partial<TemplateParam>): string {
	return `
	<div class="todo__list__item Image">
		<div class="item_content">
			<div class="content">
				<img src="${content}" />
			</div>
			<div class="title">${title}</div>
		</div>
		<div class="delete_button">x</div>
	</div>`;
}

export function makeVideoTemplate({
	title,
	content,
}: Partial<TemplateParam>): string {
	return `
	<div class="todo__list__item Video">
		<div class="item_content">
			<div class="content">
				<video src="${content}"
								controls></video>
			</div>
			<div class="title">${title}</div>
		</div>
		<div class="delete_button">x</div>
	</div>`;
}

export function makeMemoTemplate({
	title,
	content,
}: Partial<TemplateParam>): string {
	return `
	<div class="todo__list__item Memo">
		<div class="item_content">
			<div class="title">${title}</div>
			<div class="content">● ${content}</div>
		</div>
		<div class="delete_button">x</div>
	</div>`;
}
