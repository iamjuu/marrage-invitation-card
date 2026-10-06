document.addEventListener("DOMContentLoaded", () => {
  const envScreen = document.getElementById("env-screen");
  const envOuter = document.getElementById("env");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  let isPlaying = false;
  let shouldResumeOnVisible = false;

  document.body.classList.add("is-locked");

  function updateMusicButton() {
    if (musicIcon) {
      musicIcon.textContent = isPlaying ? "\uD83D\uDD0A" : "\uD83D\uDD07";
    }
  }

  function playMusic() {
    if (!music) return Promise.reject(new Error("No audio element"));
    music.volume = 0.3;
    return music.play().then(() => {
      isPlaying = true;
      shouldResumeOnVisible = false;
      updateMusicButton();
    });
  }

  function pauseMusicForVisibility() {
    if (music && isPlaying && !music.paused) {
      music.pause();
      isPlaying = false;
      shouldResumeOnVisible = true;
      updateMusicButton();
    }
  }

  function resumeMusicForVisibility() {
    if (!music || !shouldResumeOnVisible) return;

    playMusic().catch(() => {
      shouldResumeOnVisible = false;
    });
  }

  function openEnv() {
    if (!envOuter || !envScreen) return;

    envOuter.classList.add("opening");
    playMusic().catch(() => {
      updateMusicButton();
    });

    setTimeout(() => {
      envScreen.classList.add("gone");

      setTimeout(() => {
        envScreen.style.display = "none";
        document.body.classList.remove("is-locked");
      }, 1000);
    }, 1750);
  }

  envOuter?.addEventListener("click", openEnv);

  musicToggle?.addEventListener("click", () => {
    if (!music) return;

    if (isPlaying) {
      music.pause();
      isPlaying = false;
      shouldResumeOnVisible = false;
      updateMusicButton();
    } else {
      playMusic().catch((err) => {
        console.log(err);
      });
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseMusicForVisibility();
    } else {
      resumeMusicForVisibility();
    }
  });

  window.addEventListener("blur", pauseMusicForVisibility);
  window.addEventListener("focus", resumeMusicForVisibility);
  updateMusicButton();
});
