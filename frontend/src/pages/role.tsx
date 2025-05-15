const posts = [
    {
      id: 1,
      title: 'Doctor',
      href: '#doctor',
    },
    {
      id: 2,
      title: 'Patient',
      href: '#patient',
    },
    {
      id: 3,
      title: 'Diagnostics',
      href: '#diagnostics',
    },
  ];
  
  export default function Role() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Select your role
            </h2>
          </div>
  
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-full text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">{post.title}</h3>
                </div>
  
                <div className="mt-6 w-full text-center">
                  <a
                    href={post.href}
                    className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Continue as →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }
  