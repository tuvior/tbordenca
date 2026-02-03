import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

function reactAttribute(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

function trimEdgeText(nodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) return [];

  // leading
  if (nodes[0]?.type === 'text' && typeof nodes[0].value === 'string') {
    const v = nodes[0].value.replace(/^\s+/, '');
    if (v) nodes[0] = { ...nodes[0], value: v };
    else nodes = nodes.slice(1);
  }

  // trailing
  if (
    nodes.length &&
    nodes[nodes.length - 1]?.type === 'text' &&
    typeof nodes[nodes.length - 1].value === 'string'
  ) {
    const last = nodes[nodes.length - 1];
    const v = last.value.replace(/\s+$/, '');
    if (v) nodes[nodes.length - 1] = { ...last, value: v };
    else nodes = nodes.slice(0, -1);
  }

  return nodes;
}

function splitOnPipe(children) {
  if (!Array.isArray(children)) return null;

  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    if (n?.type !== 'text' || typeof n.value !== 'string') continue;

    const j = n.value.indexOf('|');
    if (j === -1) continue;

    const left = n.value.slice(0, j);
    const right = n.value.slice(j + 1);

    const labelNodes = [...children.slice(0, i), ...(left ? [{ ...n, value: left }] : [])];

    const bodyNodes = trimEdgeText([
      ...(right ? [{ ...n, value: right }] : []),
      ...children.slice(i + 1),
    ]);

    // Build a minimal mdast parent so `toString` can stringify the phrasing nodes.
    const label = toString({ type: 'paragraph', children: labelNodes }).trim();

    return { label, body: bodyNodes };
  }

  return null;
}

export default function remarkTextWithNote() {
  return tree => {
    visit(tree, node => {
      const isNote =
        (node.type === 'textDirective' || node.type === 'containerDirective') &&
        node.name === 'note';
      if (!isNote) return;

      const split = splitOnPipe(node.children);

      const attrsObj = node.attributes ?? {};
      const hasLabel = Object.prototype.hasOwnProperty.call(attrsObj, 'label');

      const attributes = Object.entries(attrsObj).map(([k, v]) => reactAttribute(k, v));
      if (!hasLabel) attributes.push(reactAttribute('label', split?.label || 'Note'));

      if (split?.body) node.children = split.body;

      node.type = node.type === 'textDirective' ? 'mdxJsxTextElement' : 'mdxJsxFlowElement';
      node.name = 'TextWithNote';
      node.attributes = attributes;
    });
  };
}
