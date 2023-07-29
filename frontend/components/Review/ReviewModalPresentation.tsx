import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Props = {
  body: string | undefined;
  rating: number | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: ({ body, rating }: { body: string; rating: number }) => void;
};
export default function ReviewModalPresentation({
  body = "",
  rating = 3,
  isOpen,
  setIsOpen,
  onSubmit,
}: Props) {
  const [reviewBody, setReviewBody] = useState(body);
  const [reviewRating, setReviewRating] = useState(rating);
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewBody(e.target.value);
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewRating(Number(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({ body: reviewBody, rating: reviewRating });
    setIsOpen(false);
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:h-full sm:max-h-max sm:my-8 sm:w-full sm:max-w-screen-sm sm:p-6">
                <form onSubmit={handleSubmit}>
                  <Dialog.Title>
                    <h3 className="text-lg font-medium leading-6 text-white">
                      レビューを投稿する
                    </h3>
                  </Dialog.Title>
                  <div className="my-2 flex items-center justify-between gap-5">
                    <label
                      htmlFor="review-rating"
                      className="block text-xl font-medium text-white"
                    >
                      {reviewRating}
                    </label>
                    <input
                      id="review-rating"
                      type="range"
                      min="1"
                      max="5"
                      step="0.5"
                      className="w-11/12 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      value={reviewRating}
                      onChange={handleRatingChange}
                    />
                  </div>
                  <label
                    htmlFor="review-body"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    レビュー
                  </label>
                  <textarea
                    id="review-body"
                    value={reviewBody}
                    onChange={handleBodyChange}
                    rows={10}
                    className="block p-2.5 w-full text-sm rounded-lg border focus:ring-teal-600 focus:border-teal-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                    placeholder="ここにあなたのレビューを入力してください。ゲームのグラフィック、ストーリー、キャラクター、音楽など、感じた点を具体的に詳しく書いてみましょう。あなたの意見が他のゲーマーにとって貴重な参考になります。また、ネタバレには注意してください。"
                  />

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-teal-700 border border-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      投稿する
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
