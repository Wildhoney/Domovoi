import * as u from './utils.js';

export const h = (tag, props = {}, children = []) => ({ tag, props, children });

export const patch = (root, tree) => {
    const nodes = [...root.childNodes];

    [].concat(tree).forEach(({ tag, props, children }, index) => {
        // Use the current node in the DOM, otherwise create it from the tree.
        const node =
            nodes[index] || u.isNode(tag) ? tag : document.createElement(tag);

        // Update the attributes by comparing the node to the tree.
        Object.entries(props).forEach(([name, value]) =>
            u.isFalsy(value)
            ? node.removeAttribute(name)
               : value !== node.getAttribute(name) && node.setAttribute(name, value)
        );

        // If the child is a text node then we'll update the text, otherwise recurse.
        u.isString(children)
            ? (node.innerHTML = children)
            : patch(node, children);

        // Finally append the child node to its parent node.
        root.append(node);


        h('div', {}, [
            h('a', {}, 'View Link')
        ]);

        h('div', {}, [
            h('a', {}, 'View Link'),
            h('a', {}, 'Close')
        ]);

        h('div', {}, [
            h('a', {}, 'View Link'),
            h('span', {}, [
                h('a', {}, 'Close')
            ])
        ]);

    });

    return root;
};
