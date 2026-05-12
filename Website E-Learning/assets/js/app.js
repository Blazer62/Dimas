// ============================
// APLIKASI E-LEARNING DASHBOARD
// ============================

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  checkLogin();
  initializeUserData();
  updateUI();
  loadDarkMode();
});

// ===== LOGIN MANAGEMENT =====
function checkLogin() {
  const currentPage = window.location.pathname.split("/").pop();
  const user = localStorage.getItem("userLogin");

  // Jika tidak ada user dan bukan di halaman login, redirect ke login
  if (!user && currentPage !== "index.html" && currentPage !== "") {
    window.location.href = "index.html";
  }

  // Jika sudah login, tampilkan nama user
  if (user) {
    const userData = JSON.parse(user);
    const userElements = document.querySelectorAll(
      "#userNameDisplay, #userInitial",
    );
    userElements.forEach((el) => {
      if (el.id === "#userNameDisplay") {
        el.innerText = userData.name;
      } else if (el.id === "#userInitial") {
        el.innerText = userData.name.charAt(0);
      }
    });
  }
}

function logout() {
  if (confirm("Yakin ingin keluar?")) {
    localStorage.removeItem("userLogin");
    window.location.href = "index.html";
  }
}

// ===== DATA MANAGEMENT =====
function initializeUserData() {
  // Default user data jika belum ada
  if (!localStorage.getItem("userStats")) {
    const defaultStats = {
      xp: 0,
      level: 1,
      materiSelesai: 0,
      badges: [],
      completedMaterials: [],
    };
    localStorage.setItem("userStats", JSON.stringify(defaultStats));
  }
}

function getUserStats() {
  const stats = localStorage.getItem("userStats");
  return stats
    ? JSON.parse(stats)
    : {
        xp: 0,
        level: 1,
        materiSelesai: 0,
        badges: [],
        completedMaterials: [],
      };
}

function saveUserStats(stats) {
  localStorage.setItem("userStats", JSON.stringify(stats));
  updateUI();
}

// ===== XP & LEVEL SYSTEM =====
function addXP(amount) {
  const stats = getUserStats();
  stats.xp += amount;

  // Hitung level berdasarkan XP
  const nextLevelXP = 500; // XP yang dibutuhkan per level
  stats.level = Math.floor(stats.xp / nextLevelXP) + 1;

  saveUserStats(stats);
  showNotification(`+${amount} XP! Total: ${stats.xp} XP`, "success");
}

function completeMateri(materiName = "Materi") {
  const stats = getUserStats();

  // Tambah XP
  addXP(100);

  // Tambah materi selesai
  stats.materiSelesai += 1;
  if (!stats.completedMaterials.includes(materiName)) {
    stats.completedMaterials.push(materiName);
  }

  // Cek badge
  checkBadges(stats);

  saveUserStats(stats);
  closeModal();
}

function completeMateriDetail() {
  const stats = getUserStats();
  const materiTitle = document.getElementById("detailTitle").innerText;
  const xpReward = parseInt(document.getElementById("detailXP").innerText);

  addXP(xpReward);
  stats.materiSelesai += 1;
  if (!stats.completedMaterials.includes(materiTitle)) {
    stats.completedMaterials.push(materiTitle);
  }

  checkBadges(stats);
  saveUserStats(stats);
  closeDetailModal();

  showNotification(
    `Materi "${materiTitle}" selesai! +${xpReward} XP`,
    "success",
  );
}

// ===== BADGE SYSTEM =====
function checkBadges(stats) {
  const badges = [
    {
      id: "first_material",
      name: "Langkah Awal",
      condition: () => stats.materiSelesai >= 1,
    },
    {
      id: "five_materials",
      name: "Pelajar Rajin",
      condition: () => stats.materiSelesai >= 5,
    },
    { id: "level_5", name: "Naik Jenjang", condition: () => stats.level >= 5 },
    {
      id: "thousand_xp",
      name: "Pengguna Setia",
      condition: () => stats.xp >= 1000,
    },
    {
      id: "master",
      name: "Master Belajar",
      condition: () => stats.materiSelesai >= 10,
    },
  ];

  badges.forEach((badge) => {
    if (badge.condition() && !stats.badges.includes(badge.id)) {
      stats.badges.push(badge.id);
      showNotification(`Badge Baru: ${badge.name}`, "success");
    }
  });
}

// ===== UI UPDATE =====
function updateUI() {
  const stats = getUserStats();

  // Update XP related elements
  const xpElements = {
    totalXP: stats.xp,
    currentXP: stats.xp,
    xpText: `${stats.xp} XP`,
  };

  Object.entries(xpElements).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  });

  // Update Level
  const levelElements = document.querySelectorAll(
    "#levelText, #levelTextDisplay",
  );
  levelElements.forEach((el) => (el.innerText = `Level ${stats.level}`));

  // Update Progress Bar
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    const nextLevelXP = 500;
    const currentLevelXP = (stats.level - 1) * nextLevelXP;
    const progress = ((stats.xp - currentLevelXP) / nextLevelXP) * 100;
    progressBar.style.width = Math.min(progress, 100) + "%";
  }

  // Update next level XP
  const nextLevelXPEl = document.getElementById("nextLevelXP");
  if (nextLevelXPEl) {
    nextLevelXPEl.innerText = stats.level * 500;
  }

  // Update Materi Selesai
  const materiDoneEl = document.getElementById("materiDone");
  if (materiDoneEl) materiDoneEl.innerText = stats.materiSelesai;

  // Update Peringkat
  const peringkatEl = document.getElementById("peringkat");
  if (peringkatEl) {
    const rank = Math.max(1, 10 - Math.floor(stats.xp / 200));
    peringkatEl.innerText = `#${rank}`;
  }

  // Update My Leaderboard XP
  const myLeaderboardXP = document.getElementById("myLeaderboardXP");
  if (myLeaderboardXP) {
    myLeaderboardXP.innerText = `${stats.xp} XP`;
  }

  // Load profile picture
  loadProfilePicture();
}

// ===== MODAL MANAGEMENT =====
function startMateri(materiName) {
  const modal = document.getElementById("materiModal");
  if (modal) {
    document.getElementById("modalTitle").innerText =
      `Mulai Materi: ${materiName}`;
    modal.classList.remove("hidden");
  }
}

function closeModal() {
  const modal = document.getElementById("materiModal");
  if (modal) modal.classList.add("hidden");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.add("hidden");
}

// ===== DARK MODE =====
function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark);
}

function loadDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.documentElement.classList.add("dark");
  }
}

// ===== PROFILE PICTURE MANAGEMENT =====
function changeProfilePicture() {
  const fileInput = document.getElementById("profileImageInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      localStorage.setItem("profileImage", imageData);
      loadProfilePicture();
      showNotification("Foto profil berhasil diubah!", "success");
      fileInput.value = "";
    };
    reader.readAsDataURL(file);
  }
}

function loadProfilePicture() {
  const imageData = localStorage.getItem("profileImage");
  const avatarContainers = document.querySelectorAll("#userAvatarContainer");
  const profileImages = document.querySelectorAll("#profileImage");
  const userInitials = document.querySelectorAll("#userInitial");

  if (imageData) {
    avatarContainers.forEach((container) => {
      container.style.background = "none";
    });
    profileImages.forEach((img) => {
      img.src = imageData;
      img.classList.remove("hidden");
    });
    userInitials.forEach((initial) => {
      initial.classList.add("hidden");
    });
  } else {
    avatarContainers.forEach((container) => {
      container.style.background =
        "linear-gradient(to right, #2563eb, #4f46e5)";
    });
    profileImages.forEach((img) => {
      img.classList.add("hidden");
    });
    userInitials.forEach((initial) => {
      initial.classList.remove("hidden");
    });
  }
}

// ===== QUIZ MANAGEMENT =====
function loadQuiz(materiId) {
  const quizzes = {
    1: [
      {
        question: "Apa singkatan dari HTML?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language",
        ],
        correct: 0,
      },
      {
        question: "Tag HTML mana yang digunakan untuk judul?",
        options: ["<title>", "<h1>", "<header>", "<heading>"],
        correct: 1,
      },
      {
        question:
          "Atribut apa yang digunakan untuk menambahkan URL di tag 'a'?",
        options: ["src", "href", "link", "url"],
        correct: 1,
      },
    ],
    2: [
      {
        question: "Apa properti CSS yang digunakan untuk mengubah warna teks?",
        options: ["text-color", "color", "font-color", "text-style"],
        correct: 1,
      },
      {
        question: "Display mana yang membuat elemen sejajar secara horizontal?",
        options: ["block", "inline", "flex", "table"],
        correct: 2,
      },
      {
        question: "Apa kepanjangan dari CSS?",
        options: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Computer Style Sheets",
          "Colors and Styles Syntax",
        ],
        correct: 0,
      },
    ],
    3: [
      {
        question:
          "Tipe data apa yang digunakan untuk menyimpan teks di JavaScript?",
        options: ["string", "text", "char", "word"],
        correct: 0,
      },
      {
        question: "Fungsi mana yang digunakan untuk menampilkan output?",
        options: ["print()", "console.log()", "output()", "display()"],
        correct: 1,
      },
      {
        question: "Apa operator untuk perbandingan sama dengan?",
        options: ["=", "==", "===", "Semua benar"],
        correct: 2,
      },
    ],
  };

  const quiz = quizzes[materiId] || quizzes[1];
  const quizContainer = document.getElementById("quizContainer");

  if (quizContainer) {
    quizContainer.innerHTML = quiz
      .map(
        (q, idx) => `
      <div class="space-y-2">
        <p class="font-semibold text-gray-900">${idx + 1}. ${q.question}</p>
        <div class="space-y-2" id="quiz-${idx}">
          ${q.options
            .map(
              (option, optIdx) =>
                `<label class="flex items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
            <input type="radio" name="question-${idx}" value="${optIdx}" class="mr-2" />
            <span class="text-sm text-gray-700">${option}</span>
          </label>`,
            )
            .join("")}
        </div>
      </div>
    `,
      )
      .join("");
  }

  // Store quiz data for submission
  window.currentQuiz = quiz;
}

function submitQuiz() {
  if (!window.currentQuiz) {
    showNotification("Kuis tidak tersedia", "error");
    return;
  }

  let correctAnswers = 0;
  const totalQuestions = window.currentQuiz.length;

  for (let i = 0; i < totalQuestions; i++) {
    const selected = document.querySelector(
      `input[name="question-${i}"]:checked`,
    );
    if (!selected) {
      showNotification(
        "Harap jawab semua pertanyaan sebelum submit!",
        "warning",
      );
      return;
    }
    if (parseInt(selected.value) === window.currentQuiz[i].correct) {
      correctAnswers++;
    }
  }

  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const baseXP = 100;
  const bonusXP = Math.floor((score / 100) * 50); // Bonus hingga 50 XP untuk nilai sempurna
  const totalXP = baseXP + bonusXP;

  if (score >= 70) {
    addXP(totalXP);
    showNotification(
      `Kuis Selesai! Nilai: ${score}% - XP Diperoleh: +${totalXP}`,
      "success",
    );
  } else {
    showNotification(
      `Nilai kuis: ${score}%. Minimal harus 70% untuk lulus. Coba lagi!`,
      "warning",
    );
  }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = "info") {
  // Buat element notifikasi
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg z-50 animate-slide-in`;

  // Set color berdasarkan type
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  notification.classList.add(colors[type] || colors.info);
  notification.innerText = message;
  document.body.appendChild(notification);

  // Remove setelah 3 detik
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ===== FORM HANDLING =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Demo validation
    if (email === "siswa@mail.com" && password === "123456") {
      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          email: email,
          name: "Gusti Rizky Ananda",
        }),
      );
      window.location.href = "dashboard.html";
    } else {
      showNotification("Email atau password salah!", "error");
    }
  });
}

// ===== UTILITIES =====
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimestamp() {
  return new Date().toLocaleString("id-ID");
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", function (event) {
  // Alt + L untuk logout
  if (event.altKey && event.key === "l") {
    logout();
  }
  // Alt + D untuk dark mode
  if (event.altKey && event.key === "d") {
    toggleDarkMode();
  }
  // Esc untuk tutup modal
  if (event.key === "Escape") {
    closeModal();
    closeDetailModal();
  }
});

// ===== EXPORT DATA =====
function exportUserData() {
  const stats = getUserStats();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const data = {
    user: user,
    stats: stats,
    exportDate: new Date().toISOString(),
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `learn-data-${Date.now()}.json`;
  link.click();
}

// ===== RESET DATA (untuk testing) =====
function resetAllData() {
  if (
    confirm(
      "Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan!",
    )
  ) {
    localStorage.removeItem("userStats");
    localStorage.removeItem("userLogin");
    location.reload();
  }
}

console.log("LearnHub Dashboard - Siap Digunakan");
console.log("Shortcuts: Alt+L (Logout), Alt+D (Dark Mode), Esc (Close Modal)");
