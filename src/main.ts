import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
interface SidebarExpandOnHoverSettings {
  leftHidden: boolean;
  rightHidden: boolean;
  leftSideEnabled: boolean;
  rightSideEnabled: boolean;
}

const DEFAULT_SETTINGS: SidebarExpandOnHoverSettings = {
  leftHidden: false,
  rightHidden: false,
  leftSideEnabled: true,
  rightSideEnabled: true,
};

export default class SidebarExpandOnHoverPlugin extends Plugin {
  settings: SidebarExpandOnHoverSettings;
  leftRibbon: HTMLElement;
  rightRibbon: HTMLElement;

  async onload() {
    // Initialize and set events when layout is fully ready
    this.app.workspace.onLayoutReady(() => {
      this.loadSettings().then(() => {
        this.initialize();
        this.setEvents();
        this.addSettingTab(new SidebarExpandOnHoverSettingTab(this.app, this));
        // This timeout is needed to override Obsidian sidebar state at launch
        setTimeout(() => {
          if (this.settings.leftHidden) {
			this.leftRibbon.classList.toggle("hover-mode");
          }
          if (this.settings.rightHidden) {
			this.rightRibbon.classList.toggle("hover-mode");
          }
        }, 200);
      });
    });

    this.addCommand({
      id: 'Toggle-Left-Sidebar-Expand-On-Hover',
      name: 'Toggle Left Sidebar Behavior',
      callback: () => {
        this.settings.leftSideEnabled = !this.settings.leftSideEnabled;
        if (this.settings.leftSideEnabled == false)
          this.settings.leftHidden = false; //todo
        this.saveSettings();
        if (this.settings.leftSideEnabled) {
          new Notice('Left Sidebar Expand on Hover Enabled');
        } else {
          new Notice('Left Sidebar Expand on Hover disabled');
        }
      },
    });

    this.addCommand({
      id: 'Toggle-Right-Sidebar-Expand-On-Hover',
      name: 'Toggle Right Sidebar Behavior',
      callback: () => {
        this.settings.rightSideEnabled = !this.settings.rightSideEnabled;
        if (this.settings.rightSideEnabled == false)
          this.settings.rightHidden = false; //todo
        this.saveSettings();
        if (this.settings.rightSideEnabled) {
          new Notice('Right Sidebar Expand on Hover Enabled');
        } else {
          new Notice('Right Sidebar Expand on Hover disabled');
        }
      },
    });
  }

  // Initializes the variables to store DOM HTML elements
  initialize: Function = () => {
    this.leftRibbon = (this.app.workspace.leftRibbon as any).containerEl;
    this.rightRibbon = (this.app.workspace.rightRibbon as any).containerEl;
  };

  // Adds event listeners to the HTML elements
  setEvents: Function = () => {
    // Double click on left ribbon to toggle pin/unpin of left sidebar
    this.registerDomEvent(this.leftRibbon, 'dblclick', () => {
      if (this.settings.leftSideEnabled) {
        this.settings.leftHidden = !this.settings.leftHidden;
        this.saveSettings();
      }
    });

    // Double click on right ribbon to toggle pin/unpin of right sidebar
    // the ribbon is covered by the right sidebar
    // this.registerDomEvent(this.rightSidebar, 'dblclick', () => {
      // if (this.settings.rightSideEnabled) {
        // this.settings.rightHidden = !this.settings.rightHidden;
        // this.saveSettings();
      // }
    // });
  // };

  onunload() {
    this.saveSettings();
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// Plugin settings
class SidebarExpandOnHoverSettingTab extends PluginSettingTab {
  plugin: SidebarExpandOnHoverPlugin;

  constructor(app: App, plugin: SidebarExpandOnHoverPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    this.plugin.loadData();
    containerEl.createEl('h2', { text: 'Sidebar Expand On Hover' });
    containerEl.createEl('p', {
      text: `Note: You can also double click on each of the ribbons to 'pin' the corresponding 
      sidebar so that it remains expanded.
      You can undo this 'pinned state' behavior by double clicking on the ribbons again.
      This only works when you have that sidebar 'enabled' in this settings. Enjoy! :D`,
    });

    containerEl.createEl('h4', { text: 'Enable Individual Sidebar' });
    const leftSideEnabled = new Setting(containerEl);
    leftSideEnabled.setName('Left Sidebar');
    leftSideEnabled.setDesc(
      'Toggle to enable/disable left sidebar expand on hover'
    );
    leftSideEnabled.addToggle((t) => {
      t.setValue(this.plugin.settings.leftSideEnabled);
      t.onChange(async (v) => {
        this.plugin.settings.leftSideEnabled = v;
        if (v == false) this.plugin.settings.leftHidden = false;
        this.plugin.saveSettings();
      });
    });

    const rightSideEnabled = new Setting(containerEl);
    rightSideEnabled.setName('Right Sidebar');
    rightSideEnabled.setDesc(
      'Toggle to enable/disable right sidebar expand on hover'
    );
    rightSideEnabled.addToggle((t) => {
      t.setValue(this.plugin.settings.rightSideEnabled);
      t.onChange(async (v) => {
        this.plugin.settings.rightSideEnabled = v;
        if (v == false) this.plugin.settings.rightHidden = false;
        this.plugin.saveSettings();
      });
    });

  }
}