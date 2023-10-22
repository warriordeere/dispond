'use client'

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import './titlebar.css';
import '../../../globals.css';
import { appWindow } from '@tauri-apps/api/window';

export default function WindowTitlebar() {
  return (
    <div data-tauri-drag-region className="titlebar" id='titlebar'>
      <div className="titlebar-ui-container">
        <div className="titlebar_button" id="titlebar-minimize" onClick={() => { appWindow.minimize() }}>
          <VscChromeMinimize />
        </div>
        <div className="titlebar_button" id="titlebar-maximize" onClick={() => { appWindow.maximize() }}>
          <VscChromeMaximize />
        </div>
        <div className="titlebar_button" id="titlebar-close" onClick={() => { appWindow.close() }}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
}