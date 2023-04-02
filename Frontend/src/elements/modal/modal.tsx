/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface props {
  setOpenModal: (e: boolean) => void;
  onSucc: () => void;
  title: string;
  children: JSX.Element;
}

const Modal: React.FC<props> = ({ setOpenModal, onSucc, children, title }) => (
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="fixed inset-0 h-full w-full bg-black opacity-40" onClick={() => setOpenModal(false)} />
    <div className="flex min-h-screen items-center px-4 py-8">
      <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
        <div className="mt-3 flex flex-col">
          <div className="border-b border-b-indigo-400">
            <h3 className="mb-1 text-2xl font-bold text-indigo-700">{title}</h3>
          </div>
          <div>{children}</div>
          <div className="mt-2 flex w-full justify-end gap-3 border-t border-t-indigo-200 pt-3">
            <button
              type="button"
              className="rounded border border-indigo-700 px-4 py-2 transition-all hover:bg-indigo-100"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded border border-indigo-700 bg-indigo-700 px-6 py-2 text-indigo-50 transition-all hover:bg-indigo-800 hover:text-indigo-50"
              onClick={() => {
                onSucc();
                setOpenModal(false);
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
