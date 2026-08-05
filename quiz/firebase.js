<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged 
  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  import { 
    getDatabase, 
    ref, 
    set, 
    update 
  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDCvxxaQuhu7APdXeK7rsHfp_G7jlyN6Ok",
    authDomain: "kira-kira-nihon-go.firebaseapp.com",
    projectId: "kira-kira-nihon-go",
    storageBucket: "kira-kira-nihon-go.firebasestorage.app",
    messagingSenderId: "630256948182",
    appId: "1:630256948182:web:5436dc0b58acc6ab414a77",
    measurementId: "G-0K94MKWYCW"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  window.registerUser = function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, "users/" + user.uid), {
          name: name,
          email: email,
          score_bab1: 0,
          score_bab2: 0,
          score_bab3: 0
        });

        alert("Akun berhasil dibuat!");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  window.loginUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login berhasil!");
        window.location.href = "quiz.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  window.saveScore = function(bab, score) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        update(ref(db, "users/" + user.uid), {
          ["score_" + bab]: score
        });
      }
    });
  }
</script>
