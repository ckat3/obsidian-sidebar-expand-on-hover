/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_SETTINGS = {
    mySetting: 'default',
};
class MyPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.ribbon = null;
        this.sidebar = null;
        // editor: any = null;
        // preview: any = null;
        this.workspace = null;
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading mouse hover expand plugin');
            yield this.loadSettings();
            // this.addRibbonIcon('dice', 'Sample Plugin', () => {
            // 	new Notice('This is a notice!');
            // });
            this.addStatusBarItem().setText('Status Bar Text');
            // this.addCommand({
            // 	id: 'open-sample-modal',
            // 	name: 'Open Sample Modal',
            // 	// callback: () => {
            // 	// 	console.log('Simple Callback');
            // 	// },
            // 	checkCallback: (checking: boolean) => {
            // 		let leaf = this.app.workspace.activeLeaf;
            // 		if (leaf) {
            // 			if (!checking) {
            // 				new SampleModal(this.app).open();
            // 			}
            // 			return true;
            // 		}
            // 		return false;
            // 	}
            // });
            // this.addSettingTab(new SampleSettingTab(this.app, this));
            // this.registerCodeMirror((cm: CodeMirror.Editor) => {
            // 	console.log('codemirror', cm);
            // });
            // this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
            // 	console.log('click', evt);
            // });
            this.registerDomEvent(document, 'mousemove', (evt) => {
                this.ribbon = Array.from(document.getElementsByClassName('workspace-ribbon'));
                this.sidebar = Array.from(document.getElementsByClassName('mod-left-split'));
                this.workspace = document.getElementsByClassName('mod-root');
                // this.editor = document.getElementsByClassName('markdown-source-view');
                // this.preview = document.getElementsByClassName('markdown-preview-view');
                this.ribbon[0].addEventListener('mouseover', this.expandSidebar);
                this.expandSidebar = () => {
                    this.sidebar[0].style.width = '266px';
                    this.sidebar[0].style.removeProperty('display');
                };
                this.collapseSidebar = () => {
                    this.sidebar[0].style.width = '0px';
                };
                try {
                    document.body.addEventListener('mouseleave', this.collapseSidebar.bind(this));
                }
                finally {
                    console.log('Failed to get mouseleave event for document object');
                }
                this.workspace[1].addEventListener('mouseover', this.collapseSidebar);
                //this.preview[0].addEventListener('mouseover', this.collapseSidebar);
                // console.log('click', evt);
                // this.loadData().then((data) => {
                //   console.log(data);
                // });
            });
            this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
        });
    }
    onunload() {
        console.log('unloading mouse hover expand plugin');
        // Reset the html element selection variables
        this.ribbon = null;
        this.sidebar = null;
        this.workspace = null;
        this.collapseSidebar = null;
        this.expandSidebar = null;
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}
// 	onOpen() {
// 		let {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}
// 	onClose() {
// 		let {contentEl} = this;
// 		contentEl.empty();
// 	}
// }
// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;
// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}
// 	display(): void {
// 		let {containerEl} = this;
// 		containerEl.empty();
// 		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});
// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue('')
// 				.onChange(async (value) => {
// 					console.log('Secret: ' + value);
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }

module.exports = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVB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
