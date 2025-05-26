import { useNavigate } from "react-router-dom";

const posts = [
  { id: 1, title: "Doctor", href: "doctor" },
  { id: 2, title: "Patient", href: "patient" },
];

export default function Role() {
  const navigate = useNavigate();

  function handleSelectRole(role) {
    navigate(`/signup?role=${role}`);
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-24 sm:py-32">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center mb-16">
        Select your role
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl pl-70">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-center justify-between p-6 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
            onClick={() => handleSelectRole(post.href)}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {post.title}
            </h3>
            <button className="rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition">
              Continue as →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
