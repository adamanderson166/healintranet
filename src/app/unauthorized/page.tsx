export default function Unauthorized() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-lg mb-4">You don't have permission to access this page.</p>
          <a href="/" className="text-indigo-600 hover:text-indigo-800">Return to Home</a>
        </div>
      </div>
    );
  }