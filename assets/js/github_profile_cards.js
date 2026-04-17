document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".github-profile-card[data-github-username]");

  cards.forEach(async (card) => {
    const username = card.getAttribute("data-github-username");
    if (!username) return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const profile = await response.json();

      const name = card.querySelector(".github-profile-card__name");
      const login = card.querySelector(".github-profile-card__login");
      const bio = card.querySelector(".github-profile-card__bio");
      const avatar = card.querySelector(".github-profile-card__avatar");
      const meta = card.querySelector('[data-field="meta"]');

      if (name) name.textContent = profile.name || profile.login || username;
      if (login) login.textContent = `@${profile.login || username}`;
      if (bio) {
        bio.textContent =
          profile.bio || "Public profile information from GitHub.";
      }
      if (avatar && profile.avatar_url) {
        avatar.src = profile.avatar_url;
      }

      ["public_repos", "followers", "following"].forEach((field) => {
        const target = card.querySelector(`[data-field="${field}"]`);
        if (target) {
          target.textContent = Number(profile[field] ?? 0).toLocaleString();
        }
      });

      const metaParts = [profile.company, profile.location, profile.blog]
        .filter(Boolean)
        .map((value) => value.toString().replace(/^@/, ""));

      if (meta) {
        meta.textContent =
          metaParts.join(" • ") || "View full contribution history on GitHub.";
      }
    } catch (error) {
      const bio = card.querySelector(".github-profile-card__bio");
      if (bio) {
        bio.textContent =
          "GitHub profile data could not be loaded right now. Open the profile directly.";
      }
    }
  });
});
