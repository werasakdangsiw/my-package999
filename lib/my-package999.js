'use babel';

import MyPackage999View from './my-package999-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackage999View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackage999View = new MyPackage999View(state.myPackage999ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackage999View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package999:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackage999View.destroy();
  },

  serialize() {
    return {
      myPackage999ViewState: this.myPackage999View.serialize()
    };
  },

  toggle() {
    console.log('MyPackage999 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
