import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (isSignup && !name.trim()) {
      alert("Please enter your name to create an account.");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: name.trim(),
        });
        alert("Signup Successful 🎉");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful ✅");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    
    } catch (error) {
      
      if (error.code !== "auth/popup-closed-by-user") {
        console.error("Google Auth Error:", error);
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black animate-fade-in relative overflow-hidden">
      
     
      <div className="absolute inset-0 overflow-hidden z-0">
        <iframe
          className="absolute w-[300vw] h-[300vh] sm:w-[150vw] sm:h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
          src="https://www.youtube.com/embed/1NnyVc8r2SM?autoplay=1&mute=1&loop=1&playlist=1NnyVc8r2SM&controls=0&showinfo=0&rel=0&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          title="X-Men Background"
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/60 to-purple-900/60"></div>
      </div>

     
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/20 animate-scale-in relative z-20 w-96"
      >
        <div className="text-center mb-8 animate-fade-in-up delay-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4 animate-float shadow-inner border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-300 mt-2 text-sm font-medium">
            {isSignup ? "Sign up to join the team" : "Enter your details to sign in"}
          </p>
        </div>

        {isSignup && (
          <div className="animate-fade-in-up delay-200">
            <input
              type="text"
              placeholder="Full Name"
              required
              minLength="2"
              className="w-full mb-4 p-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="animate-fade-in-up delay-300">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full mb-4 p-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="animate-fade-in-up delay-400">
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            className="w-full mb-6 p-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="animate-fade-in-up delay-500 space-y-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              isSignup
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/40"
                : "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-pink-500/40"
            }`}
          >
            {loading ? "Processing..." : (isSignup ? "Sign Up" : "Sign In")}
          </button>

          <div className="relative flex items-center justify-center w-full py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative bg-transparent px-4 text-sm text-gray-400 font-medium">Or</div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white/10 border border-white/20 text-white p-4 rounded-xl hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 font-bold flex items-center justify-center gap-3 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {loading ? "Please wait..." : "Continue with Google"}
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-300 font-medium animate-fade-in-up delay-500">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-400 cursor-pointer ml-1 font-bold hover:text-purple-300 transition-colors"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;