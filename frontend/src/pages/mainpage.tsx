import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Secure Patient Data Storage',
    description:
      'All patient records are encrypted and securely stored on decentralized infrastructure to prevent data breaches.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Privacy with zk-SNARKs',
    description:
      'Zero-knowledge proofs ensure data integrity while maintaining complete patient anonymity and privacy.',
    icon: LockClosedIcon,
  },
  {
    name: 'Automated Medical Backups',
    description:
      'Health records are automatically backed up to decentralized storage to ensure availability during emergencies.',
    icon: ServerIcon,
  },
]

export default function MainPage() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Next-Gen HealthTech</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Decentralized Healthcare Platform
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Our blockchain-powered healthcare application provides secure and private access to patient records, ensuring seamless interaction between providers and individuals.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          
          <img
            alt="Medical DNA graphic"
            src="https://cdn.pixabay.com/photo/2024/07/15/06/52/dna-8895881_960_720.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
        
      </div>

    </div>
  )
}
