'use client';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { states } from '@/utils/states';
import { db } from '@/utils/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function Contribute() {
  const logForm = async (e: any) => {
    e.preventDefault();
    console.log('test');
    try {
      console.log('test2');
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const outcomesCollection = collection(db, '');
      const outcomeDoc = doc(outcomesCollection, '');
      await setDoc(outcomeDoc, {
        user1: {
          ...data,
          createdAt: Date.now(),
        },
      });

      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <form className="" onSubmit={logForm}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Outcomes Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Input your Bootcamp outcome here!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="bootcampName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bootcamp
                </label>
                <div className="mt-2">
                  <select
                    id="bootcamp"
                    name="bootcamp"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>App Academy</option>
                    <option>BrainStation</option>
                    <option>CareerFoundry</option>
                    <option>Codesmith</option>
                    <option>Flatiron School</option>
                    <option>Fullstack Academy</option>
                    <option>Galvanize</option>
                    <option>Springboard</option>
                    <option>Thinkful</option>
                    <option>Turing School of Software & Design</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <select
                    id="location"
                    name="location"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {states.map((state, key) => (
                      <option key={key}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2">
                  <input
                    id="company"
                    name="company"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Position Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="position"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Salary
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="salary"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="YOE"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prior Related Years Of Experience
                </label>
                <div className="mt-2">
                  <select
                    id="YOE"
                    name="YOE"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>0-2</option>
                    <option>2-5</option>
                    <option>6 +</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
