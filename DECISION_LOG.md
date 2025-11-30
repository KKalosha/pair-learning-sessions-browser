I convert `mins` to a number right in the session card, when rendering.  
It’s the simplest and safest place — I don’t mutate the JSON,  
but make sure the UI always displays a proper number.

For the debounce, I started with `lodash.debounce`  
and then replaced it with a custom `useDebouncedValue` hook.  
It’s only a few lines of code, easy to read and reuse,  
and removes dependency on an external library.

If two sessions have the same popularity,  
I sort them alphabetically by title.  
That keeps the order consistent and avoids jumping when switching sort direction.

The toggle is a plain `<button>` with `aria-pressed` and a dynamic `aria-label`.  
It’s fully keyboard-accessible and works well with screen readers.  
Loading and error states also have `role="status"` and `role="alert` for feedback.