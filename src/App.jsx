import React, { useCallback, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import Result from './components/Result';

function App() {
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');
  const [isFullScreenHtml, setIsFullScreenHtml] = useState(false);
  const [isFullScreenCss, setIsFullScreenCss] = useState(false);
  const [isFullScreenJs, setIsFullScreenJs] = useState(false);
  const [theme, setTheme] = useState('dark');

  //to store the html,css & JavaScript code 
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  //Full-screen functionality
  const toggleFullScreen = (editor) => {
    if (editor === 'html') {
      setIsFullScreenHtml(!isFullScreenHtml);
    } else if (editor === 'css') {
      setIsFullScreenCss(!isFullScreenCss);
    } else if (editor === 'js') {
      setIsFullScreenJs(!isFullScreenJs);
    }
  };

  //theme changer
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getBoxClassName = (editor) => {
    if (editor === 'html' && isFullScreenHtml) {
      return "bg-[#282c34] p-4 rounded-lg shadow fixed top-0 left-0 right-0 bottom-0 z-50";
    } else if (editor === 'css' && isFullScreenCss) {
      return "bg-[#282c34] p-4 rounded-lg shadow fixed top-0 left-0 right-0 bottom-0 z-50";
    } else if (editor === 'js' && isFullScreenJs) {
      return "bg-[#282c34] p-4 rounded-lg shadow fixed top-0 left-0 right-0 bottom-0 z-50";
    }
    return "bg-[#282c34] p-4 rounded-lg shadow";
  };

  //* Create Html Document (to show the output)
  const srcCode = `
  <html>
  <body>${html_edit}</body>
  <style>${css_edit}</style>
  <script>${js_edit}</script>
  </html>`

  return (
    <div>
      <div className="">
        <div className="flex justify-between mb-2 px-5 py-3 bg-black">
          <h1 className='text-2xl text-white font-bold '>CodeCraft</h1>
          <button className="text-white font-bold bg-gray-700 px-4 py-1 rounded-full" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* html editor box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className={getBoxClassName('html')}>
            <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
              <button
                className='h-7 text-xs text-white px-3 py-1 rounded bg-green-800'
                onClick={() => toggleFullScreen('html')}
              >
                {isFullScreenHtml ? 'Exit Full Screen' : 'Full Screen'}
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={html_edit}
              height="342px"
              theme={theme}
              extensions={[html(true)]}
              onChange={onChangeHtml}
              options={{
                lineWrapping: true
              }}
            />
          </div>

          {/* css editor box */}
          <div className={getBoxClassName('css')}>
            <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
              <button
                className='h-7 text-xs  text-white px-3 py-1 rounded bg-green-800'
                onClick={() => toggleFullScreen('css')}
              >
                {isFullScreenHtml ? 'Exit Full Screen' : 'Full Screen'}
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={css_edit}
              height="342px"
              theme={theme}
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>

          {/* Javascript editor box */}
          <div className={getBoxClassName('js')}>
            <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2>
              <button
                className='h-7 text-xs  text-white px-3 py-1 rounded bg-green-800'
                onClick={() => toggleFullScreen('js')}
              >
                {isFullScreenHtml ? 'Exit Full Screen' : 'Full Screen'}
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border whitespace-wrap overflow-auto"
              value={js_edit}
              height="342px"
              theme={theme}
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
              options={{
                lineWrapping: true
              }}
            />
          </div>
        </div>

        <Result srcCode={srcCode} />
      </div>
    </div>
  );
}

export default App;
