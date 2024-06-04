export default function LoadingButton() {
  return (
    <button className={`btn flex items-center px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition duration-500`}>
      <span className="loading loading-ring loading-md"></span>
    </button>
  );
}
