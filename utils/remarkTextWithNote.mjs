import { visit } from 'unist-util-visit';

function reactAttribute(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

function toAttributes(attributes) {
  if (!attributes) {
    return [];
  }

  const props = [];
  for (const attribute in attributes) {
    props.push(reactAttribute(attribute, attributes[attribute]));
  }

  return props;
}

function getTextValue(node) {
  if (!node) {
    return '';
  }

  if (node.type === 'text') {
    return node.value ?? '';
  }

  if (Array.isArray(node.children)) {
    return node.children.map(getTextValue).join('');
  }

  return '';
}

function trimTextEdges(nodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }

  const result = nodes.map(node => ({ ...node }));
  const first = result[0];

  if (first?.type === 'text' && typeof first.value === 'string') {
    const trimmed = first.value.replace(/^\s+/, '');
    if (trimmed) {
      first.value = trimmed;
    } else {
      result.shift();
    }
  }

  if (result.length === 0) {
    return result;
  }

  const updatedLast = result[result.length - 1];
  if (updatedLast?.type === 'text' && typeof updatedLast.value === 'string') {
    const trimmed = updatedLast.value.replace(/\s+$/, '');
    if (trimmed) {
      updatedLast.value = trimmed;
    } else {
      result.pop();
    }
  }

  return result;
}

function splitNoteChildren(children) {
  if (!Array.isArray(children)) {
    return null;
  }

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    if (child?.type !== 'text' || typeof child.value !== 'string') {
      continue;
    }

    const pipeIndex = child.value.indexOf('|');
    if (pipeIndex === -1) {
      continue;
    }

    const leftText = child.value.slice(0, pipeIndex);
    const rightText = child.value.slice(pipeIndex + 1);
    const labelNodes = [
      ...children.slice(0, index),
      ...(leftText ? [{ ...child, value: leftText }] : []),
    ];
    const bodyNodes = [
      ...(rightText ? [{ ...child, value: rightText }] : []),
      ...children.slice(index + 1),
    ];

    return {
      label: getTextValue({ children: labelNodes }).trim(),
      body: trimTextEdges(bodyNodes),
    };
  }

  return null;
}

export default function remarkTextWithNote() {
  return tree => {
    visit(tree, node => {
      const isNoteDirective =
        (node.type === 'textDirective' || node.type === 'containerDirective') &&
        node.name === 'note';

      if (!isNoteDirective) {
        return;
      }

      const split = splitNoteChildren(node.children);
      const hasLabelAttribute =
        node.attributes && Object.prototype.hasOwnProperty.call(node.attributes, 'label');
      const attributes = toAttributes(node.attributes);
      const fallbackLabel = split?.label?.trim() || 'Note';

      if (!hasLabelAttribute) {
        attributes.push(reactAttribute('label', fallbackLabel));
      }

      if (split?.body) {
        node.children = split.body;
      }

      node.type = node.type === 'textDirective' ? 'mdxJsxTextElement' : 'mdxJsxFlowElement';
      node.name = 'TextWithNote';
      node.attributes = attributes;
    });
  };
}
