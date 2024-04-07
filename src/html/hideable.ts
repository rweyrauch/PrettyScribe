/**
 * Marks an element as hideable so it can be hidden on calls to `toggleHidden`.
 * @returns the element.
 */
export function addHideAble<T extends Element>(element: T): T {
  element.classList.add('hide_able')
  return element;
}

/**
 * Event handler that will mark an element as hidden when printing.
 */
export function toggleHidden(event: Event) {
  if (!event.target) return;
  
  const element = event.target as Element;
  element.closest('.hide_able')?.classList.toggle('hidden');
  // For clicks on the unit header, hide the entire unit sheet.
  element.closest('.unit_header')?.closest('.wh40k_unit_sheet')?.classList.toggle('hidden');
}
