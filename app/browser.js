//borrowed helpers from https://github.com/hokein/electron-sample-apps/blob/master/webview/browser/browser.js

window.onresize = doLayout;
var isLoading = false;
var firstLaunch = true;
var splashShown = false;

function onload() {
  var webview = document.querySelector('webview');
  doLayout();

  webview.addEventListener('close', handleExit);
  webview.addEventListener('did-start-loading', handleLoadStart);
  webview.addEventListener('did-stop-loading', handleLoadStop);
  webview.addEventListener('did-fail-load', handleLoadAbort);
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect);
  webview.addEventListener('did-finish-load', handleLoadCommit);

}

function doLayout() {
  var webview = document.querySelector('webview')
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
}

function showSplash() {
  var splash = document.querySelector("#splash");
  splash.style.display = "block";
}

function hideSplash() {
  var splash = document.querySelector("#splash");
  splash.style.display = "none";
}

function handleLoadStart() {
  //put spinner
  console.log("Load Start");

  if (firstLaunch === true) {
    showSplash();
    console.log("Splash Shown");
    firstLaunch = false;
    splashShown = true;
  }
}

function handleLoadStop() {
  //end spinner
  console.log("Load Stopped");

  if (!firstLaunch && splashShown) {
    hideSplash();
    splashShown = false;
  }
}

function handleLoadCommit() {
  console.log("Load Finish");
}

function handleLoadAbort() {
  //pass
}

function handleLoadRedirect() {
  //pass
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}



