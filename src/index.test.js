import test from 'ava';
import { h, patch } from './index.js';

test('It should be able to create the elements;', t => {
    const input = h('div', { language: 'en-GB' }, [
        h('div', {}, 'Hello'),
        h('div', {}, 'Adam')
    ]);
    const output = {
        tag: 'div',
        props: { language: 'en-GB' },
        children: [
            { tag: 'div', props: {}, children: 'Hello' },
            { tag: 'div', props: {}, children: 'Adam' }
        ]
    };
    t.deepEqual(input, output);
});

test('It should be able to create the elements using node references;', t => {
    const node = document.createElement('div');
    const input = h(node, { language: 'en-GB' });
    const output = {
        tag: node,
        props: { language: 'en-GB' },
        children: []
    };
    t.deepEqual(input, output);
});

test('It should be able to patch a simple node;', t => {
    const node = document.createElement('section');
    const tree = h('div', { language: 'en-GB' }, 'Hello Adam');
    const output = patch(node, tree);
    t.is(
        output.outerHTML,
        '<section><div language="en-GB">Hello Adam</div></section>'
    );
});

test('It should be able to patch a nested node tree with children;', t => {
    const node = document.createElement('section');
    const tree = h('div', { language: 'en-GB' }, [
        h('div', {}, 'Hello'),
        h('div', {}, 'Adam')
    ]);
    const output = patch(node, tree);
    t.is(
        output.outerHTML,
        '<section><div language="en-GB"><div>Hello</div><div>Adam</div></div></section>'
    );
});
