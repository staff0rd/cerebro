import { Menu, Tray } from 'electron'

/**
 * Class that controls state of icon in menu bar
 */
export default class AppTray {
  /**
   * @param  {String} options.src Absolute path for tray icon
   * @param  {Function} options.onToggleWindow Handle toggle main window
   * @param  {Function} options.onShowSettings Handle show settings
   * @param  {Function} options.onQuit  Handle quit from application
   * @return {AppTray}
   */
  constructor(options) {
    this.tray = null
    this.options = options
  }
  /**
   * Show application icon in menu bar
   */
  show() {
    const {
      onToggleWindow, onShowSettings, onListPlugins, onQuit, src
    } = this.options
    const tray = new Tray(src)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Toggle Cerebro',
        click: onToggleWindow
      },
      { type: 'separator' },
      {
        label: 'Plugins',
        click: onListPlugins
      },
      { type: 'separator' },
      {
        label: 'Preferences...',
        click: onShowSettings
      },
      { type: 'separator' },
      {
        label: 'Quit Cerebro',
        click: onQuit
      }
    ])
    tray.setToolTip('Cerebro')
    tray.setContextMenu(contextMenu)
    this.tray = tray
  }
  /**
   * Hide icon in menu bar
   */
  hide() {
    if (this.tray) {
      this.tray.destroy()
      this.tray = null
    }
  }
}
