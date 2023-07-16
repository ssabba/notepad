import Script from "next/script";
import React from "react";
import useLocales from "src/hooks/useLocales";

const NotepadEditor = () => {
  const { translate } = useLocales();
  return (
    <>
      <Script strategy="beforeInteractive" src="/js/editor.js" />
      <Script strategy="beforeInteractive" src="/js/jspdf.js" />
      <Script strategy="afterInteractive" src="/js/ui.js" />
      <Script strategy="lazyOnload" src="/js/script.js" />
      <div className="container">
        <div className="nav">
          <div className="top-bar">
            <div className="dropdown file" data-dropdown>
              <button className="link" data-dropdown-button>
                {translate("file")}
              </button>
              <div className="dropdown-menu drop-file" id="dropdown-menu-file">
                <a id="file-opt-new">{translate("new")}</a>
                <a id="file-opt-open">{translate("open")}</a>
                <a id="file-opt-save">{translate("save")}</a>
                <a id="file-opt-save-as">{translate("saveAs")}</a>
                <a id="file-opt-save-as-pdf">{translate("saveAs")}pdf</a>
                <a id="file-opt-print">{translate("print")}</a>
                <a id="file-opt-share">{translate("share")}</a>
              </div>
            </div>
            <div className="dropdown edit" data-dropdown>
              <button className="link" data-dropdown-button>
                {translate("edit")}
              </button>
              <div className="dropdown-menu drop-edit" id="dropdown-menu-edit">
                <a id="edit-opt-cut">{translate("cut")}</a>
                <a id="edit-opt-copy">{translate("copy")}</a>
                <a id="edit-opt-delete">{translate("delete")}</a>
                <a id="edit-opt-select-all">{translate("selectAll")}</a>
                <a id="edit-opt-paste">{translate("paste")}</a>
                <a id="edit-opt-undo">{translate("undo")}</a>
                <a id="edit-opt-redo">{translate("redo")}</a>
              </div>
            </div>
            <div className="dropdown view" data-dropdown>
              <button className="link" data-dropdown-button>
                {translate("view")}
              </button>
              <div className="dropdown-menu drop-view" id="dropdown-menu-view">
                <a id="dropdown-opt-auto-line-break">
                  {translate("autoLineBreak")}
                </a>
                <a id="toggle-number-bar">
                  <span id="lineNumberState">{translate("show")}</span>{" "}
                  {translate("lineNumber")}
                </a>
                <a id="toggleColorMode">{translate("darkMode")}</a>
              </div>
            </div>
            <div className="dropdown view" data-dropdown>
              <button className="link" id="log"></button>
            </div>
          </div>
          <div className="options">
            <div className="option options-1" id="option-1">
              <button className="option-icon" id="new-short-btn">
                <img src="./assets/icons/new.png" alt="new" />
              </button>
              <button className="option-icon" id="open-short-btn">
                <img src="./assets/icons/open.png" alt="open" />
              </button>
              <button className="option-icon" id="save-short-btn">
                <img src="./assets/icons/save.png" alt="save" />
              </button>
            </div>
            <div className="option options-2" id="option-2">
              <button className="option-icon" id="print-short-btn">
                <img src="./assets/icons/print.png" alt="print" />
              </button>
              <button className="option-icon" id="cut-short-btn">
                <img src="./assets/icons/cut.png" alt="cut" />
              </button>
              <button className="option-icon" id="copy-short-btn">
                <img src="./assets/icons/copy.png" alt="copy" />
              </button>
              <button className="option-icon" id="paste-short-btn">
                <img src="./assets/icons/paste.png" alt="paste" />
              </button>
              <button className="option-icon" id="share-short-btn">
                <img src="./assets/icons/share.png" alt="share" />
              </button>
              <button className="option-icon" id="undo-short-btn">
                <img src="./assets/icons/undo.png" alt="undo" />
              </button>
              <button className="option-icon" id="redo-short-btn">
                <img src="./assets/icons/redo.png" alt="redo" />
              </button>
            </div>
          </div>
        </div>
        <div className="editor" id="editor"></div>
        <div
          id="vertical-toggle-button"
          className="vertical-toggle vertical-enactive"
        >
          {translate("selectVertically")}
          <br />
          <span className="vertical-toggle-status" id="vertical-toggle-status">
            off
          </span>
        </div>
      </div>
    </>
  );
};

export default NotepadEditor;
