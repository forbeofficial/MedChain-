import  LogOut  from "../components/LogOutbutton";
import {
  ArrowUpRight,
  Clock,
  Users,
  Bookmark,
  ShieldCheck
} from "lucide-react";

export function Dashboard() {
  const actions = [
    {
      icon: <Clock className="h-6 w-6 text-emerald-400" />,
      title: "View Profile",
      description:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: "View Record",
      description:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
    },
    {
      icon: <Bookmark className="h-6 w-6 text-red-600" />,
      title: "Upload Past Records",
      description:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "Grant Permission",
      description:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Welcome to Patient Dashboard</h2>
        <LogOut />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700 rounded-lg overflow-hidden">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="group relative bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{action.icon}</div>
              <div>
                <h3 className="text-base font-semibold">{action.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{action.description}</p>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}