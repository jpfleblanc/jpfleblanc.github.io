document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".github-profile-card[data-github-username]");

  Array.prototype.forEach.call(cards, function (card) {
    var username = card.getAttribute("data-github-username");
    if (!username) return;

    fetch("https://api.github.com/users/" + username, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("GitHub API returned " + response.status);
        }

        return response.json();
      })
      .then(function (profile) {
        var name = card.querySelector(".github-profile-card__name");
        var login = card.querySelector(".github-profile-card__login");
        var bio = card.querySelector(".github-profile-card__bio");
        var avatar = card.querySelector(".github-profile-card__avatar");
        var meta = card.querySelector('[data-field="meta"]');

        if (name) {
          name.textContent = profile.name || profile.login || username;
        }
        if (login) {
          login.textContent = "@" + (profile.login || username);
        }
        if (bio) {
          bio.textContent = profile.bio || "Public profile information from GitHub.";
        }
        if (avatar && profile.avatar_url) {
          avatar.src = profile.avatar_url;
        }

        ["public_repos", "followers", "following"].forEach(function (field) {
          var target = card.querySelector('[data-field="' + field + '"]');
          var value = profile[field];

          if (target) {
            target.textContent = Number(value || 0).toLocaleString();
          }
        });

        var metaParts = [profile.company, profile.location, profile.blog].filter(Boolean).map(function (value) {
          return value.toString().replace(/^@/, "");
        });

        if (meta) {
          meta.textContent = metaParts.join(" • ") || "View full contribution history on GitHub.";
        }
      })
      .catch(function () {
        var bio = card.querySelector(".github-profile-card__bio");

        if (bio) {
          bio.textContent = "GitHub profile data could not be loaded right now. Open the profile directly.";
        }
      });
  });
});
