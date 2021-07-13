import * as assert from 'assert';
import './main.svelte';

export default function (target) {
	target.innerHTML = '<custom-element name="world" answer="42" test="svelte"></custom-element>';
	const el = target.querySelector('custom-element');

	assert.htmlEqual(el.shadowRoot.innerHTML, `
		<p>name: world</p>
		<p>$$props: {"name":"world","answer":"42","test":"svelte"}</p>
		<p>$$restProps: {"answer":"42","test":"svelte"}</p>
	`);

	el.setAttribute('name', 'hello');
	el.setAttribute('world', 'world');

	assert.htmlEqual(el.shadowRoot.innerHTML, `
		<p>name: hello</p>
		<p>$$props: {"name":"hello","answer":"42","test":"svelte","world":"world"}</p>
		<p>$$restProps: {"answer":"42","test":"svelte","world":"world"}</p>
	`);

	el.removeAttribute('name');
	el.removeAttribute('test');
	el.toggleAttribute('test3');

	assert.htmlEqual(el.shadowRoot.innerHTML, `
		<p>name: null</p>
		<p>$$props: {"name":null,"answer":"42","test":null,"world":"world","test3":""}</p>
		<p>$$restProps: {"answer":"42","test":null,"world":"world","test3":""}</p>
	`);

	el.name = 'Bob';

	assert.htmlEqual(el.shadowRoot.innerHTML, `
		<p>name: Bob</p>
		<p>$$props: {"name":"Bob","answer":"42","test":null,"world":"world","test3":""}</p>
		<p>$$restProps: {"answer":"42","test":null,"world":"world","test3":""}</p>
	`);
}
