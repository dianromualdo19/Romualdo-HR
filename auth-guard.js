import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

function isAdminPage() {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  return file === "dashboard.html";
}

async function isAdminUser(uid) {
  const snap = await get(ref(db, `admins/${uid}`));
  return snap.exists();
}

function redirectToLogin() {
  // replace = cannot go back to dashboard after logout
  location.replace("login.html");
}

function wireLogout() {
  document.querySelectorAll("[data-logout]").forEach((el) => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
      } finally {
        // extra safety: clear any cached role/session
        localStorage.removeItem("role");
        localStorage.removeItem("uid");
        redirectToLogin();
      }
    });
  });
}

wireLogout();

onAuthStateChanged(auth, async (user) => {
  if (!user) return redirectToLogin();

  localStorage.setItem("uid", user.uid);

  const admin = await isAdminUser(user.uid);
  localStorage.setItem("role", admin ? "admin" : "employee");

  // If an employee somehow opens admin dashboard.html, kick them out.
  if (isAdminPage() && !admin) {
    return location.replace("employee-dashboard.html");
  }
});

