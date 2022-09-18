'use babel';

import MyPackage999 from '../lib/my-package999';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MyPackage999', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('my-package999');
  });

  describe('when the my-package999:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.my-package999')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-package999:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.my-package999')).toExist();

        let myPackage999Element = workspaceElement.querySelector('.my-package999');
        expect(myPackage999Element).toExist();

        let myPackage999Panel = atom.workspace.panelForItem(myPackage999Element);
        expect(myPackage999Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'my-package999:toggle');
        expect(myPackage999Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.my-package999')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-package999:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let myPackage999Element = workspaceElement.querySelector('.my-package999');
        expect(myPackage999Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'my-package999:toggle');
        expect(myPackage999Element).not.toBeVisible();
      });
    });
  });
});
