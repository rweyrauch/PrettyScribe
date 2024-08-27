// Inspired by https://www.meziantou.net/write-your-own-dom-element-factory-for-typescript.htm
// and https://itnext.io/lessons-learned-using-jsx-without-react-bbddb6c28561

declare global {
  namespace JSX {
      interface IntrinsicElements {
          [elemName: string]: any;
      }
  }
}


export namespace PsJsx {
  interface AttributeCollection {
    [name: string]: string | boolean | EventListener | ((e: HTMLElement) => void);
  }

  export function createFragment() {
    return document.createDocumentFragment();
  }

  export function createElement(tagName: string | Function, attributes: AttributeCollection | null, ...children: any[]): Element | DocumentFragment {
      const element = typeof tagName === 'function'
        ? tagName() :
        document.createElement(tagName);
      if (attributes) {
        for (const key of Object.keys(attributes)) {
          const attributeValue = attributes[key];

          if (typeof attributeValue === "boolean") {
            element.setAttribute(key, "");
          } else if (typeof attributeValue === "function") {
            if (key === 'ref') {
              (attributeValue as (e: HTMLElement) => void)(element);
            } else if (key.startsWith("on")) {
                element.addEventListener(key.substring(2), attributeValue as EventListener);
            } else {
              throw new Error('Unexpected function attribute');
            }
          } else if (key === "className") { // JSX does not allow class as a valid name
              element.setAttribute("class", attributeValue);
          } else {
              element.setAttribute(key, attributeValue);
          }
        }
      }

      for (const child of children) {
        appendChild(element, child);
      }

      return element;
  }

  function appendChild(parent: Node, child: any) {
    if (typeof child === "undefined" || child === null) {
        return;
    }

    if (Array.isArray(child)) {
      for (const value of child) {
        appendChild(parent, value);
      }
    } else if (typeof child === "string") {
      parent.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      parent.appendChild(child);
    } else if (typeof child === "boolean") {
      // <>{condition && <a>Display when condition is true</a>}</>
      // if condition is false, the child is a boolean, but we don't want to display anything
    } else {
        parent.appendChild(document.createTextNode(String(child)));
    }
  }
}
