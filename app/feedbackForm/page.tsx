'use client';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/Button';

export default function FeedbackForm() {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post('/api/feedbackForm', {
      comment: comment,
    });
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          Feedback Form
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600 mx-20">
         Let us hear your feedback! This could be a bug report, a feature request, a missing bootcamp, or anything else you want to share with us.
        </p>
      </div>
      <form action="#" className="m-20">
        <Tab.Group>
          {({ selectedIndex }) => (
            <>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                  <label htmlFor="comment" className="sr-only">
                    Comment
                  </label>
                  <div>
                    <textarea
                      rows={5}
                      name="comment"
                      id="comment"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="    Let us know what's wrong!"
                      defaultValue={'   '}
                      onChange={handleComment}
                    />
                    {'       '}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
        <div className="mt-2 flex justify-end">
            <Button color = 'blue' onClick={handleSubmit}>Submit</Button>

        </div>
      </form>
    </>
  );
}
