import createAuth0Client from "https://cdn.auth0.com/js/auth0-spa-js/2.5/auth0-spa-js.production.js";

let auth0Client = null;

async function initAuth0() {
  auth0Client = await createAuth0Client({
    domain: "dev-iodu8vnuoj5b8u4g.us.auth0.com",      // e.g. yourapp.us.auth0.com
    clientId: "WTWfrjxJwo1xiG0INkGjwRLwjr3SDQJU", // from Auth0 dashboard
    cacheLocation: "localstorage",
    useRefreshTokens: true
  });

  // Handle login redirect
  if (window.location.search.includes("code=") &&
      window.location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
}

async function login() {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
}

async function logout() {
  await auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}

async function updateUI() {
  const isAuthenticated = await auth0Client.isAuthenticated();
  const loginBtn = document.getElementById("loginButton");
  const logoutBtn = document.getElementById("logoutButton");
  const userName = document.getElementById("userName");

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userName.textContent = user.name || user.email;

    // Store user in AppState if your app.js uses it
    window.AppState = window.AppState || {};
    AppState.currentUser = user;
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userName.textContent = "Guest";
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await initAuth0();
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("logoutButton").addEventListener("click", logout);
});
