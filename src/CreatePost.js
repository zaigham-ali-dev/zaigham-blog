import { useState } from "react";
import { db, auth } from "./firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
    } catch (logoutError) {
      console.error(logoutError);
      setError(logoutError.message || "Logout failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please enter both a title and a description.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title: title.trim(),
        description: description.trim(),
        author: auth.currentUser?.email || "anonymous",
        createdAt: serverTimestamp(),
      });

      setMessage("Post saved successfully! It will appear in Firestore shortly.");
      setTitle("");
      setDescription("");
    } catch (submitError) {
      console.error(submitError);
      setError(submitError.message || "Could not save the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 font-sans animate-fade-in relative overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-100"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-300"></div>

      
      <div className="absolute top-10 left-10 text-5xl opacity-40 animate-roam-1 pointer-events-none select-none z-0"></div>
      <div className="absolute top-1/2 right-20 text-6xl opacity-30 animate-roam-2 pointer-events-none select-none z-0"></div>
      <div className="absolute bottom-20 left-1/4 text-5xl opacity-40 animate-roam-3 pointer-events-none select-none z-0"></div>
      <div className="absolute top-1/3 left-1/2 text-4xl opacity-30 animate-roam-1" style={{animationDelay: '-15s'}}></div>
      <div className="absolute bottom-1/3 right-1/3 text-6xl opacity-20 animate-roam-2" style={{animationDelay: '-20s'}}></div>
      <div className="absolute top-10 right-10 text-5xl opacity-40 animate-roam-3" style={{animationDelay: '-10s'}}></div>

      <div className="mx-auto max-w-4xl relative z-10 animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 animate-fade-in-up delay-100">
                Create a New Post
              </h2>
              <p className="text-blue-100 text-sm sm:text-base font-medium max-w-lg animate-fade-in-up delay-200">
                Share your thoughts with the world. Your post will be stored securely in Firestore.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="whitespace-nowrap rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up delay-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>

          
          <div className="p-8 sm:p-10">
            {message && (
              <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-4 flex items-start gap-3 animate-scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-green-800 font-medium">{message}</p>
              </div>
            )}

            {error && (
              <div className="mb-8 rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 animate-scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in-up delay-200">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Post Title
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging title..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all duration-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="animate-fade-in-up delay-300">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Post Description
                </label>
                <textarea
                  rows="6"
                  placeholder="What's on your mind?..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all duration-300 resize-y"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="animate-fade-in-up delay-400 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-indigo-500/30 flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving post...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      Publish Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
