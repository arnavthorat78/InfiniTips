// If the user manually went into the admin dashboard, and they weren't logged in, then show them the sign in page.
if (!sessionStorage.getItem("adminLoggedIn")) {
    location.replace("./sign-in.html");
}
