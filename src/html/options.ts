/**
 * @fileoverview Methods for dealing with various options for rendering and
 * printing roster files.
 */

/**
 * Renders the main "Options" text and toggle; clicking it will toggle whether
 * the full options are shown or hidden.
 * @param parent element to append the toggle to
 */
export function renderOptionsToggle(parent: HTMLElement) {
  parent.classList.add('wh40k_options_toggle');
  parent.id = 'wh40k_options_toggle';
  const optionsToggleExpandedText = '[\u2212] Options:';
  const optionsToggleCollapsedText = '[+] Options';
  parent.appendChild(document.createTextNode(optionsToggleExpandedText));
  parent.addEventListener('click', (e: Event) => {
      const optionsDiv = document.getElementById('wh40k_options_div');
      const optionsToggle = document.getElementById('wh40k_options_toggle');
      if (!optionsDiv || !optionsToggle) return;

      if (optionsDiv.classList.contains('hide_options')) {
          optionsDiv.classList.remove('hide_options');
          optionsToggle.innerText = optionsToggleExpandedText;
          saveOptionToLocalStorage('option-toggle-hidden', 'false');
      } else {
          optionsDiv.classList.add('hide_options');
          optionsToggle.innerText = optionsToggleCollapsedText;
          saveOptionToLocalStorage('option-toggle-hidden', 'true');
      }
  });
}

/**
 * Renders a checkbox option. The option will be persisted to local storage, and
 * can programmatically be reloaded later on.
 * 
 * @param parent element to append the checkbox to
 * @param idAndName id and name for the checkbox; also used for local storage
 * @param text text/label to specify for the checkbox
 * @param eventHandler event handler to run on changes to the checkbox value
 */
export function renderCheckboxOption(parent: HTMLElement, idAndName: string, text: string, eventHandler: EventListenerOrEventListenerObject, defaultChecked = false) {
  const optDiv = parent.appendChild(document.createElement('div'));
  optDiv.classList.add('wh40k_option');
  const input = optDiv.appendChild(document.createElement('input'));
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', idAndName);
  input.setAttribute('id', idAndName);
  if (defaultChecked) input.checked = true;
  input.addEventListener('input', eventHandler);
  input.addEventListener('change', e => saveCheckboxToLocalStorage(idAndName));
  const label = optDiv.appendChild(document.createElement('label'));
  label.setAttribute('for', idAndName);
  label.appendChild(document.createTextNode(` ${text}`));
}

function saveCheckboxToLocalStorage(idAndName: string) {
  const el = document.getElementById(idAndName) as HTMLInputElement;
  if (!el) return;
  saveOptionToLocalStorage(`option-checkbox-${idAndName}`, el.checked);
}

/**
 * Saves an option value to local storage. 
 */
export function saveOptionToLocalStorage(key: string, value: any) {
  try {
      window.localStorage[key] = value;
  } catch (e) {
      // localStorage not supported or enabled
  }
}

/**
 * Loads options from local storage, updating values for corresponding inputs.
 */
export function loadOptionsFromLocalStorage() {
  try { 
      for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          const checkboxId = key?.match(/option-checkbox-(.*)/)?.[1];
          if (checkboxId) {
              const option = document.getElementById(checkboxId) as HTMLInputElement;
              if (!option) continue;

              option.checked = window.localStorage[key] === 'true';
              option.dispatchEvent(new Event('input'));
          } else if (key === 'option-toggle-hidden') {
              const optionsDiv = document.getElementById('wh40k_options_div');
              const optionsToggle = document.getElementById('wh40k_options_toggle');
              if (!optionsDiv || !optionsToggle) return;

              const hideOptions = window.localStorage[key] === 'true';
  
              if (optionsDiv.classList.contains('hide_options') !== hideOptions) {
                  optionsToggle.dispatchEvent(new Event('click'));
              }
          }
      }
  } catch (e) {
      // localStorage not supported or enabled
  }
}
