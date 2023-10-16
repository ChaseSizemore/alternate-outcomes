import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function ErrorBarWithActions() {
  return (
    <div className="rounded-md bg-red-50 p-4 mt-10">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="mt-2 text-sm text-red-700">
            <p>There are nosubmissions on this bootcamp!</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                onClick={() =>{window.location.href = '/contribute'}}
                type="button"
                className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Add a submission
              </button>
              <button
              onClick={() =>{window.location.href = '/'}}
                type="button"
                className="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
