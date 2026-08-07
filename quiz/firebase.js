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

// ===============================
// KONFIGURASI FIREBASE
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyDCvxxaQuhu7APdXeK7rsHfp_G7jlyN6Ok",
    authDomain: "kira-kira-nihon-go.firebaseapp.com",
    projectId: "kira-kira-nihon-go",
    storageBucket: "kira-kira-nihon-go.firebasestorage.app",
    messagingSenderId: "630256948182",
    appId: "1:630256948182:web:5436dc0b58acc6ab441a77",
    measurementId: "G-0K94MKWYCW"
};

// ===============================
// INISIALISASI
// ===============================
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// ===============================
// FUNGSI REGISTER
// ===============================
export function registerUser(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Simpan data awal user
            set(ref(db, "users/" + user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            return user;
        });
}

// ===============================
// FUNGSI LOGIN
// ===============================
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// ===============================
// SIMPAN NILAI BAB
// ===============================
export function saveScore(bab, score) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            update(ref(db, "nilai/" + user.uid), {
                ["bab" + bab]: {
                    nilai: score,
                    tanggal: new Date().toISOString()
                }
            });
        }
    });
}
