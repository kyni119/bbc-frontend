import { SvelteURLSearchParams } from 'svelte/reactivity';

export function natsort(a: string, b: string) {
	return a.localeCompare(b, undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}

export function unfocusAndExecute(callback: () => void) {
	(document.activeElement as HTMLElement | undefined)?.blur();
	callback();
}

export function getSvelteSearchParam(param: string): string | null {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	return searchParams.get(param);
}

export function getAllSvelteSearchParams(param: string): string[] {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	return searchParams.getAll(param);
}

export function setSvelteSearchParam(param: string, value: string): void {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	searchParams.set(param, value);
	window.history.replaceState(null, '', `${window.location.pathname}?${searchParams}`);
}

export function appendSvelteSearchParam(param: string, value: string, check: boolean = true): void {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	if (check && searchParams.has(param, value)) return;
	searchParams.append(param, value);
	window.history.replaceState(null, '', `${window.location.pathname}?${searchParams}`);
}

export function removeSvelteSearchParam(param: string, value?: string): void {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	searchParams.delete(param, value);
	window.history.replaceState(null, '', `${window.location.pathname}?${searchParams}`);
}

export function hasSvelteSearchParam(param: string, value?: string): boolean {
	const searchParams = new SvelteURLSearchParams(window.location.search);
	return searchParams.has(param, value);
}

export function filterFilename(
	name: string,
	options?: {
		replaceString?: string;
		isPath?: boolean;
	}
): string {
	const replaceString = options?.replaceString || '_';
	const isPath = !!options?.isPath;

	const extensionRegex = /\.[a-z0-9]+$/i;
	const extension = name.trim().match(extensionRegex)?.pop() || '';

	const filter = (str: string, removeExtension = true) =>
		str
			.trim()
			.replace(removeExtension ? extensionRegex : '', '')
			.normalize('NFKC')
			.replace(/[\\/:"*?<>|]/g, replaceString)
			.trim()
			.slice(0, 255 - extension.length)
			.trim();

	const pathParts = name.split(/[\\/]/g);
	const filename = isPath
		? pathParts.map((p, i) => filter(p, i === pathParts.length - 1)).join('/')
		: filter(name);

	return filename + extension;
}

export function addKeyboardShortcut(keyCodes: string[], callback: () => void): () => void {
	let pressedKeys: string[] = [];

	const keyDown = (event: KeyboardEvent) => {
		pressedKeys.push(event.code);

		if (pressedKeys.sort().join(',') === keyCodes.sort().join(',')) callback();
	};
	const keyUp = () => (pressedKeys = []);

	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUp);

	return () => {
		window.removeEventListener('keydown', keyDown);
		window.removeEventListener('keyup', keyUp);
	};
}

export function getTextVariableName(name: string): string {
	return `%${name}%`;
}

export function replaceTextVariables(text: string, variables: [string, string][]) {
	return variables.reduce(
		(acc, [key, value]) => acc.replaceAll(getTextVariableName(key), value),
		text
	);
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getLocaleName(locale: string): string {
	const langDisplayNames = new Intl.DisplayNames(['en'], { type: 'language' });
	return langDisplayNames.of(locale) || locale;
}
